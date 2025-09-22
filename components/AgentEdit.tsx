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
      <form
        className="editAgent"
        onSubmit={e => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="editAgent-header">
          <span className="icon">edit_square</span>
          <input
            className="largeInput"
            type="text"
            placeholder="Nom"
            value={previewAgent.name}
            onChange={e => handleUpdate({ name: e.target.value })}
            ref={nameInput}
            aria-label="Nom de l'agent"
          />
        </div>

        <div className="editAgent-main">
          <div className="form-column">
            <label htmlFor="personality-textarea">
              Personnalité
              <textarea
                id="personality-textarea"
                value={previewAgent.personality}
                onChange={e => handleUpdate({ personality: e.target.value })}
                rows={10}
                placeholder="Comment dois-je agir ? Quel est mon but ? Comment décrirais-tu ma personnalité ?"
              />
            </label>
          </div>

          <div className="preview-column">
            <div className="agentPreview">
              <BasicFace
                canvasRef={faceCanvasRef}
                color={previewAgent.bodyColor}
                eyeShape={previewAgent.eyeShape}
                isEditing={true}
                radius={60}
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
                      type="button"
                      style={{ backgroundColor: color }}
                      onClick={() => handleUpdate({ bodyColor: color })}
                      aria-label={`Choisir la couleur ${color}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-controls-group">
              <div className="form-control">
                <label htmlFor="voice-select">Voix</label>
                <select
                  id="voice-select"
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
              <div className="form-control">
                <label htmlFor="eye-shape-select">Forme des yeux</label>
                <select
                  id="eye-shape-select"
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
          </div>
        </div>

        <div className="editAgent-footer">
          <button type="button" onClick={onClose} className="button">
            Annuler
          </button>
          <button type="submit" className="button primary">
            Enregistrer
          </button>
        </div>
      </form>
    </Modal>
  );
}