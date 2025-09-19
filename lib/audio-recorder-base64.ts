/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Alternative Audio Recorder with Base64 Embedded Worklets
 * This implementation embeds worklet code as base64 strings to avoid file loading issues
 */

import { EventEmitter } from 'eventemitter3';

// Base64 encoded worklet code - embedded directly in the bundle
const AUDIO_PROCESSING_WORKLET_BASE64 = btoa(`
/// <reference types="audioworklet" />

class AudioProcessingWorklet extends AudioWorkletProcessor {
  buffer = new Int16Array(2048);
  bufferWriteIndex = 0;
  hasAudio = false;

  constructor() {
    super();
  }

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
      data: {
        int16arrayBuffer: this.buffer.slice(0, this.bufferWriteIndex).buffer,
      },
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

    if(this.bufferWriteIndex >= this.buffer.length) {
      this.sendAndClearBuffer();
    }
  }
}

registerProcessor('audio-processing-worklet', AudioProcessingWorklet);
`);

const VOL_METER_WORKLET_BASE64 = btoa(`
/// <reference types="audioworklet" />

class VolMeter extends AudioWorkletProcessor {
    volume = 0;
    updateIntervalInMS = 25;
    nextUpdateFrame = 25;

    constructor() {
      super()
      this.port.onmessage = event => {
        if (event.data.updateIntervalInMS) {
          this.updateIntervalInMS = event.data.updateIntervalInMS
        }
      }
    }

    get intervalInFrames() {
      return (this.updateIntervalInMS / 1000) * sampleRate
    }

    process(inputs) {
      const input = inputs[0]

      if (input.length > 0) {
        const samples = input[0]
        let sum = 0
        let rms = 0

        for (let i = 0; i < samples.length; ++i) {
          sum += samples[i] * samples[i]
        }

        rms = Math.sqrt(sum / samples.length)
        this.volume = Math.max(rms, this.volume * 0.7)

        this.nextUpdateFrame -= samples.length
        if (this.nextUpdateFrame < 0) {
          this.nextUpdateFrame += this.intervalInFrames
          this.port.postMessage({volume: this.volume})
        }
      }

      return true
    }
}

registerProcessor('vol-meter', VolMeter);
`);

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

export class AudioRecorderBase64 extends EventEmitter<AudioRecorderEvents> {
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

  async start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Impossible de demander l\'accès aux médias utilisateur');
    }

    this.starting = new Promise(async (resolve, reject) => {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioContext = new AudioContext({ sampleRate: this.sampleRate });
        this.source = this.audioContext.createMediaStreamSource(this.stream);

        // Create Blob URLs from base64 encoded worklets
        const recordingWorkletCode = atob(AUDIO_PROCESSING_WORKLET_BASE64);
        const vuWorkletCode = atob(VOL_METER_WORKLET_BASE64);
        
        const recordingWorkletBlob = new Blob([recordingWorkletCode], { 
          type: 'application/javascript' 
        });
        const vuWorkletBlob = new Blob([vuWorkletCode], { 
          type: 'application/javascript' 
        });
        
        const recordingWorkletUrl = URL.createObjectURL(recordingWorkletBlob);
        const vuWorkletUrl = URL.createObjectURL(vuWorkletBlob);

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
        
        // Clean up URLs after loading
        URL.revokeObjectURL(recordingWorkletUrl);
        URL.revokeObjectURL(vuWorkletUrl);

        this.recording = true;
        console.log('Base64 worklets loaded successfully');
        resolve();
        this.starting = null;
      } catch (error) {
        console.error('Error starting base64 audio recorder:', error);
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