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
        <button
          className="roomName"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Ouvrir le menu des compagnons"
        >
          <h1 className={c({ active: false })}>{current.name}</h1>
          <div
            onClick={e => {
              e.stopPropagation();
              setShowAgentEdit(true);
            }}
            className="button createButton"
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                setShowAgentEdit(true);
              }
            }}
          >
            <span className="icon">edit</span> Modifier
          </div>
        </button>
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
