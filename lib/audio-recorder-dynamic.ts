/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Alternative Audio Recorder with Dynamic Import Strategy
 * This implementation uses dynamic imports with fallback mechanisms
 */

import { EventEmitter } from 'eventemitter3';

function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

interface AudioRecorderEvents {
  data: (base64: string) => void;
  volume: (volume: number) => void;
}

export class AudioRecorderDynamic extends EventEmitter<AudioRecorderEvents> {
  stream: MediaStream | undefined;
  audioContext: AudioContext | undefined;
  source: MediaStreamAudioSourceNode | undefined;
  recording: boolean = false;
  recordingWorklet: AudioWorkletNode | undefined;
  vuWorklet: AudioWorkletNode | undefined;

  private starting: Promise<void> | null = null;

  constructor(public sampleRate = 16000) {
    super();
  }

  private async loadWorkletWithFallback(workletPath: string, retries = 3): Promise<string> {
    const attempts = [
      // Try original path
      () => import(workletPath + '?url'),
      // Try with raw import
      () => import(workletPath + '?raw').then(module => {
        const blob = new Blob([module.default], { type: 'application/javascript' });
        return { default: URL.createObjectURL(blob) };
      }),
      // Try relative path
      () => import('./worklets/' + workletPath.split('/').pop() + '?url'),
      // Try with different extension
      () => import(workletPath.replace('.ts', '.js') + '?url')
    ];

    for (let i = 0; i < attempts.length && i < retries; i++) {
      try {
        const module = await attempts[i]();
        return module.default;
      } catch (error) {
        console.warn(`Worklet load attempt ${i + 1} failed:`, error);
        if (i === attempts.length - 1) {
          throw new Error(`Failed to load worklet after ${attempts.length} attempts: ${workletPath}`);
        }
      }
    }
    
    throw new Error(`All worklet loading strategies failed for: ${workletPath}`);
  }

  async start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Impossible de demander l\'accès aux médias utilisateur');
    }

    this.starting = new Promise(async (resolve, reject) => {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioContext = new AudioContext({ sampleRate: this.sampleRate });
        this.source = this.audioContext.createMediaStreamSource(this.stream);

        // Try to load worklets with multiple strategies
        let recordingWorkletUrl: string;
        let vuWorkletUrl: string;

        try {
          recordingWorkletUrl = await this.loadWorkletWithFallback('./worklets/audio-processing.ts');
          vuWorkletUrl = await this.loadWorkletWithFallback('./worklets/vol-meter.ts');
        } catch (error) {
          console.error('Dynamic worklet loading failed, falling back to inline code:', error);
          
          // Fallback to inline worklet code
          const inlineAudioProcessing = `
            class AudioProcessingWorklet extends AudioWorkletProcessor {
              buffer = new Int16Array(2048);
              bufferWriteIndex = 0;
              hasAudio = false;
              
              constructor() { super(); }
              
              process(inputs) {
                if (inputs[0].length) {
                  const channel0 = inputs[0][0];
                  this.processChunk(channel0);
                }
                return true;
              }
              
              sendAndClearBuffer(){
                this.port.postMessage({
                  event: "chunk",
                  data: { int16arrayBuffer: this.buffer.slice(0, this.bufferWriteIndex).buffer },
                });
                this.bufferWriteIndex = 0;
              }
              
              processChunk(float32Array) {
                const l = float32Array.length;
                for (let i = 0; i < l; i++) {
                  const int16Value = float32Array[i] * 32768;
                  this.buffer[this.bufferWriteIndex++] = int16Value;
                  if (this.bufferWriteIndex >= this.buffer.length) {
                    this.sendAndClearBuffer();
                  }
                }
              }
            }
            registerProcessor('audio-processing-worklet', AudioProcessingWorklet);
          `;
          
          const inlineVolMeter = `
            class VolMeter extends AudioWorkletProcessor {
              volume = 0;
              updateIntervalInMS = 25;
              nextUpdateFrame = 25;
              
              constructor() {
                super();
                this.port.onmessage = event => {
                  if (event.data.updateIntervalInMS) {
                    this.updateIntervalInMS = event.data.updateIntervalInMS;
                  }
                };
              }
              
              get intervalInFrames() {
                return (this.updateIntervalInMS / 1000) * sampleRate;
              }
              
              process(inputs) {
                const input = inputs[0];
                if (input.length > 0) {
                  const samples = input[0];
                  let sum = 0;
                  for (let i = 0; i < samples.length; ++i) {
                    sum += samples[i] * samples[i];
                  }
                  const rms = Math.sqrt(sum / samples.length);
                  this.volume = Math.max(rms, this.volume * 0.7);
                  this.nextUpdateFrame -= samples.length;
                  if (this.nextUpdateFrame < 0) {
                    this.nextUpdateFrame += this.intervalInFrames;
                    this.port.postMessage({volume: this.volume});
                  }
                }
                return true;
              }
            }
            registerProcessor('vol-meter', VolMeter);
          `;
          
          recordingWorkletUrl = URL.createObjectURL(new Blob([inlineAudioProcessing], { type: 'application/javascript' }));
          vuWorkletUrl = URL.createObjectURL(new Blob([inlineVolMeter], { type: 'application/javascript' }));
        }

        // Load worklets
        await this.audioContext.audioWorklet.addModule(recordingWorkletUrl);
        await this.audioContext.audioWorklet.addModule(vuWorkletUrl);

        // Create worklet nodes
        this.recordingWorklet = new AudioWorkletNode(
          this.audioContext,
          'audio-processing-worklet'
        );

        this.recordingWorklet.port.onmessage = async (ev: MessageEvent) => {
          const arrayBuffer = ev.data.data.int16arrayBuffer;
          if (arrayBuffer) {
            const arrayBufferString = arrayBufferToBase64(arrayBuffer);
            this.emit('data', arrayBufferString);
          }
        };
        this.source.connect(this.recordingWorklet);

        // vu meter worklet
        this.vuWorklet = new AudioWorkletNode(this.audioContext, 'vol-meter');
        this.vuWorklet.port.onmessage = (ev: MessageEvent) => {
          this.emit('volume', ev.data.volume);
        };

        this.source.connect(this.vuWorklet);
        
        // Clean up URLs if they were created
        if (recordingWorkletUrl.startsWith('blob:')) {
          URL.revokeObjectURL(recordingWorkletUrl);
        }
        if (vuWorkletUrl.startsWith('blob:')) {
          URL.revokeObjectURL(vuWorkletUrl);
        }

        this.recording = true;
        console.log('Dynamic worklets loaded successfully');
        resolve();
        this.starting = null;
      } catch (error) {
        console.error('Error starting dynamic audio recorder:', error);
        reject(error);
        this.starting = null;
      }
    });
  }

  stop() {
    const handleStop = () => {
      this.source?.disconnect();
      this.stream?.getTracks().forEach(track => track.stop());
      this.stream = undefined;
      this.recordingWorklet = undefined;
      this.vuWorklet = undefined;
      this.recording = false;
    };
    if (this.starting) {
      this.starting.then(handleStop);
      return;
    }
    handleStop();
  }
}