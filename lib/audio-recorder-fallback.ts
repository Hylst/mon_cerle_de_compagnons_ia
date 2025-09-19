/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Fallback Audio Recorder without Worklets
 * This implementation uses ScriptProcessorNode as a fallback when worklets fail
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

export class AudioRecorderFallback extends EventEmitter<AudioRecorderEvents> {
  stream: MediaStream | undefined;
  audioContext: AudioContext | undefined;
  source: MediaStreamAudioSourceNode | undefined;
  recording: boolean = false;
  processor: ScriptProcessorNode | undefined;
  analyser: AnalyserNode | undefined;

  private starting: Promise<void> | null = null;
  private buffer = new Int16Array(2048);
  private bufferWriteIndex = 0;
  private volumeUpdateInterval: number | undefined;

  constructor(public sampleRate = 16000) {
    super();
  }

  private sendAndClearBuffer() {
    if (this.bufferWriteIndex > 0) {
      const arrayBuffer = this.buffer.slice(0, this.bufferWriteIndex).buffer;
      const arrayBufferString = arrayBufferToBase64(arrayBuffer);
      this.emit('data', arrayBufferString);
      this.bufferWriteIndex = 0;
    }
  }

  private processChunk(float32Array: Float32Array) {
    const l = float32Array.length;
    
    for (let i = 0; i < l; i++) {
      // convert float32 -1 to 1 to int16 -32768 to 32767
      const int16Value = Math.max(-32768, Math.min(32767, float32Array[i] * 32768));
      this.buffer[this.bufferWriteIndex++] = int16Value;

      if (this.bufferWriteIndex >= this.buffer.length) {
        this.sendAndClearBuffer();
      }
    }
  }

  private updateVolume() {
    if (!this.analyser) return;
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    this.analyser.getFloatTimeDomainData(dataArray);
    
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    
    const rms = Math.sqrt(sum / bufferLength);
    this.emit('volume', rms);
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

        // Create analyser for volume monitoring
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.source.connect(this.analyser);

        // Use ScriptProcessorNode as fallback (deprecated but widely supported)
        const bufferSize = 4096;
        this.processor = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
        
        this.processor.onaudioprocess = (event) => {
          if (!this.recording) return;
          
          const inputBuffer = event.inputBuffer;
          const inputData = inputBuffer.getChannelData(0);
          
          // Process audio data
          this.processChunk(inputData);
        };

        // Connect the audio processing chain
        this.source.connect(this.processor);
        this.processor.connect(this.audioContext.destination);

        // Start volume monitoring
        this.volumeUpdateInterval = window.setInterval(() => {
          this.updateVolume();
        }, 25); // Update volume every 25ms

        this.recording = true;
        console.log('Fallback audio recorder (ScriptProcessorNode) started successfully');
        resolve();
        this.starting = null;
      } catch (error) {
        console.error('Error starting fallback audio recorder:', error);
        reject(error);
        this.starting = null;
      }
    });
  }

  stop() {
    const handleStop = () => {
      if (this.volumeUpdateInterval) {
        clearInterval(this.volumeUpdateInterval);
        this.volumeUpdateInterval = undefined;
      }
      
      if (this.processor) {
        this.processor.disconnect();
        this.processor = undefined;
      }
      
      if (this.analyser) {
        this.analyser.disconnect();
        this.analyser = undefined;
      }
      
      if (this.source) {
        this.source.disconnect();
        this.source = undefined;
      }
      
      this.stream?.getTracks().forEach(track => track.stop());
      this.stream = undefined;
      this.recording = false;
      
      // Send any remaining buffer data
      this.sendAndClearBuffer();
    };
    
    if (this.starting) {
      this.starting.then(handleStop);
      return;
    }
    handleStop();
  }
}