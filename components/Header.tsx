/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useUI, useUser, useAgent } from '../lib/state';
import c from 'classnames';

export default function Header() {
  const {
    showUserConfig,
    setShowUserConfig,
    setShowAgentEdit,
    setIsMobileMenuOpen,
  } = useUI();
  const { name } = useUser();
  const { current } = useAgent();

  return (
    <header>
      <div className="roomInfo">
        <div className="room-controls-wrapper">
          <button
            className="roomName"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Ouvrir le menu des compagnons"
          >
            <h1 className={c({ active: false })}>{current.name}</h1>
          </button>
          <button
            onClick={() => {
              setShowAgentEdit(true);
            }}
            className="button createButton"
          >
            <span className="icon">edit</span> Modifier
          </button>
        </div>
      </div>
      <button
        className="userSettingsButton"
        onClick={() => setShowUserConfig(!showUserConfig)}
      >
        <p className="user-name">{name || 'Votre nom'}</p>
        <span className="icon">tune</span>
      </button>
    </header>
  );
}