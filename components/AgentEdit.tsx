/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useRef, useState, useEffect } from 'react';
import {
  Agent,
  AGENT_COLORS,
  INTERLOCUTOR_VOICE,
  INTERLOCUTOR_VOICES,
  EyeShape,
  EYE_SHAPES,
} from '../lib/presets/agents';
import Modal from './Modal';
import c from 'classnames';
import { useAgent, useUI } from '../lib/state';
import BasicFace from './demo/basic-face/BasicFace';

export default function EditAgent() {
  const agent = useAgent(state => state.current);
  const updateAgent = useAgent(state => state.update);
  const nameInput = useRef(null);
  const faceCanvasRef = useRef<HTMLCanvasElement>(null);
  const { setShowAgentEdit } = useUI();

  // Local state for live preview
  const [previewAgent, setPreviewAgent] = useState<Agent>(agent);

  useEffect(() => {
    setPreviewAgent(agent);
  }, [agent]);

  function onClose() {
    setShowAgentEdit(false);
  }

  function handleUpdate(adjustments: Partial<Agent>) {
    setPreviewAgent(prev => ({ ...prev, ...adjustments }));
  }

  function handleSave() {
    updateAgent(agent.id, previewAgent);
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div className="editAgent">
        <div className="form-column">
          <form onSubmit={e => e.preventDefault()}>
            <div>
              <input
                className="largeInput"
                type="text"
                placeholder="Nom"
                value={previewAgent.name}
                onChange={e => handleUpdate({ name: e.target.value })}
                ref={nameInput}
              />
            </div>

            <div>
              <label>
                Personnalité
                <textarea
                  value={previewAgent.personality}
                  onChange={e => handleUpdate({ personality: e.target.value })}
                  rows={7}
                  placeholder="Comment dois-je agir ? Quel est mon but ? Comment décrirais-tu ma personnalité ?"
                />
              </label>
            </div>
          </form>
        </div>

        <div className="preview-column">
          <div className="agentPreview">
            <BasicFace
              canvasRef={faceCanvasRef}
              color={previewAgent.bodyColor}
              eyeShape={previewAgent.eyeShape}
              isEditing={true}
            />
          </div>
          <div>
            <ul className="colorPicker">
              {AGENT_COLORS.map((color, i) => (
                <li
                  key={i}
                  className={c({ active: color === previewAgent.bodyColor })}
                >
                  <button
                    style={{ backgroundColor: color }}
                    onClick={() => handleUpdate({ bodyColor: color })}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="voicePicker">
            Voix
            <select
              value={previewAgent.voice}
              onChange={e => {
                handleUpdate({
                  voice: e.target.value as INTERLOCUTOR_VOICE,
                });
              }}
            >
              {INTERLOCUTOR_VOICES.map(voice => (
                <option key={voice} value={voice}>
                  {voice}
                </option>
              ))}
            </select>
          </div>
          <div>
            Forme des yeux
            <select
              value={previewAgent.eyeShape}
              onChange={e =>
                handleUpdate({ eyeShape: e.target.value as EyeShape })
              }
            >
              {EYE_SHAPES.map(shape => (
                <option key={shape} value={shape}>
                  {shape.charAt(0).toUpperCase() + shape.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleSave} className="button primary">
          Enregistrer
        </button>
      </div>
    </Modal>
  );
}