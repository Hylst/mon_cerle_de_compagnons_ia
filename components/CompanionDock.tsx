/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { useLiveAPIContext } from '../contexts/LiveAPIContext';
import { useAgent, useUI, useInputAudio, useAppConfig } from '../lib/state';
import { Agent, createNewAgent } from '../lib/presets/agents';
import { AudioRecorderBase64 as AudioRecorder } from '../lib/audio-recorder-base64';

export default function CompanionDock() {
  const {
    current,
    setCurrent,
    availablePresets,
    availablePersonal,
    addAgent,
  } = useAgent();
  const { setShowAgentEdit } = useUI();
  const { client, connected, connect, disconnect } = useLiveAPIContext();
  const { showAgentEdit, showUserConfig, isMobileMenuOpen, setIsMobileMenuOpen } =
    useUI();
  const { setVolume } = useInputAudio();
  const { usageMode, incrementUsage } = useAppConfig();
  const [muted, setMuted] = useState(false);
  const connectButtonRef = useRef<HTMLButtonElement>(null);
  const [audioRecorder] = useState(() => new AudioRecorder());

  useEffect(() => {
    if (showAgentEdit || showUserConfig) {
      if (connected) disconnect();
    }
  }, [showUserConfig, showAgentEdit, connected, disconnect]);

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: 'audio/pcm;rate=16000',
          data: base64,
        },
      ]);
    };
    const onVolume = (volume: number) => {
      setVolume(volume);
    };

    if (connected && !muted && audioRecorder) {
      audioRecorder.on('data', onData);
      audioRecorder.on('volume', onVolume);
      audioRecorder.start();
    } else {
      audioRecorder.stop();
      setVolume(0);
    }
    return () => {
      audioRecorder.off('data', onData);
      audioRecorder.off('volume', onVolume);
    };
  }, [connected, client, muted, audioRecorder, setVolume]);

  function handleConnect() {
    if (usageMode === 'limited') {
      incrementUsage();
    }
    connect();
  }

  function changeAgent(agent: Agent | string) {
    disconnect();
    setCurrent(agent);
    setIsMobileMenuOpen(false);
  }

  function addNewCompanion() {
    disconnect();
    addAgent(createNewAgent());
    setShowAgentEdit(true);
    setIsMobileMenuOpen(false);
  }

  const allAgents = [...availablePresets, ...availablePersonal];

  return (
    <>
      <div
        className={cn('mobile-menu-backdrop', { visible: isMobileMenuOpen })}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={cn('companion-dock', { 'mobile-open': isMobileMenuOpen })}>
        <button
          className="mobile-menu-close"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Fermer le menu"
        >
          <span className="icon">close</span>
        </button>
        <div className="companion-list">
          {allAgents.map(agent => (
            <button
              key={agent.id}
              className={cn('companion-button', {
                active: agent.id === current.id,
              })}
              style={{ backgroundColor: agent.bodyColor }}
              onClick={() => changeAgent(agent)}
              aria-label={`Sélectionner ${agent.name}`}
            >
              <span className="icon">{agent.icon}</span>
              <span className="companion-name-tooltip">{agent.name}</span>
            </button>
          ))}
        </div>

        <div className="dock-controls">
          <button
            className={cn('action-button mic-button')}
            onClick={() => setMuted(!muted)}
            disabled={!connected}
          >
            {!muted ? (
              <span className="material-symbols-outlined filled">mic</span>
            ) : (
              <span className="material-symbols-outlined filled">mic_off</span>
            )}
          </button>
          <div className="connection-button-container">
            <button
              ref={connectButtonRef}
              className={cn('action-button connect-toggle', { connected })}
              onClick={connected ? disconnect : handleConnect}
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

        <div className="companion-list">
          <button className="companion-button" onClick={addNewCompanion}>
            <span className="icon">add</span>
            <span className="companion-name-tooltip">Nouveau Compagnon</span>
          </button>
        </div>
      </div>
    </>
  );
}
