/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useRef } from 'react';
import { Modality } from '@google/genai';
import cn from 'classnames';

import BasicFace from '../basic-face/BasicFace';
import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';
import { createSystemInstructions } from '../../../lib/prompts';
import { useAgent, useUser, useInputAudio } from '../../../lib/state';

export default function KeynoteCompanion() {
  const { client, connected, setConfig, connect, disconnect } =
    useLiveAPIContext();
  const faceCanvasRef = useRef<HTMLCanvasElement>(null);
  const user = useUser();
  const { current } = useAgent();
  const { volume: userVolume } = useInputAudio();

  // Set the configuration for the Live API
  useEffect(() => {
    setConfig({
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: current.voice },
        },
      },
      systemInstruction: {
        parts: [
          {
            text: createSystemInstructions(current, user),
          },
        ],
      },
    });
  }, [setConfig, user, current]);

  // Initiate the session when the Live API connection is established
  // Instruct the model to send an initial greeting message
  useEffect(() => {
    const beginSession = async () => {
      if (!connected) return;
      client.send(
        {
          text: 'Saluez l\'utilisateur et présentez-vous ainsi que votre rôle.',
        },
        true
      );
    };
    beginSession();
  }, [client, connected]);

  const indicatorSize = 250 * 2 * (userVolume * 5);

  const handleAvatarClick = () => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      if (connected) {
        disconnect();
      } else {
        connect();
      }
    }
  };

  return (
    <div className="keynote-companion">
      <div
        className="user-speaking-indicator"
        style={{
          width: `${indicatorSize}px`,
          height: `${indicatorSize}px`,
          opacity: userVolume > 0.01 ? 0.2 : 0,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ['--indicator-color' as any]: current.bodyColor,
        }}
      ></div>
      <button
        className="avatar-touch-wrapper"
        onClick={handleAvatarClick}
        aria-label={
          connected ? 'Mettre la conversation en pause' : 'Démarrer la conversation'
        }
      >
        <BasicFace
          canvasRef={faceCanvasRef!}
          color={current.bodyColor}
          eyeShape={current.eyeShape}
          accessory={current.accessory}
        />
      </button>
      <div className="mobile-controls-container">
        <div className="connection-button-container">
          <button
            className={cn('action-button connect-toggle', { connected })}
            onClick={connected ? disconnect : connect}
          >
            <span className="material-symbols-outlined filled">
              {connected ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <div className={cn('connection-status', { visible: connected })}>
            En direct
          </div>
        </div>
      </div>
    </div>
  );
}
