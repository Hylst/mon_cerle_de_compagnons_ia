/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from './Modal';
import { useUI, useUser, useAppConfig } from '../lib/state';
import { useState, useEffect } from 'react';
import { DEV_API_KEY, MAX_API_USES } from '../lib/constants';

const presets = [
  {
    category: 'Arts & Culture',
    items: [
      'Cinéma d\'auteur',
      'Musique classique',
      'Musées d\'art moderne',
      'Littérature de science-fiction',
      'Théâtre contemporain',
      'Photographie de rue',
      'Romans graphiques',
      'Concerts de jazz',
    ],
  },
  {
    category: 'Loisirs & Hobbies',
    items: [
      'Randonnée en montagne',
      'Jeux de société stratégiques',
      'Bricolage et menuiserie',
      'Jardinage urbain',
      'Cuisine du monde',
      'Course à pied',
      'Échecs en ligne',
      'Peinture à l\'aquarelle',
    ],
  },
  {
    category: 'Technologie & Science',
    items: [
      'Programmation (Python, JS)',
      'Intelligence Artificielle',
      'Exploration spatiale',
      'Gadgets high-tech',
      'Vulgarisation scientifique',
      'Cybersécurité',
      'Blockchain et cryptomonnaies',
      'Énergies renouvelables',
    ],
  },
  {
    category: 'Voyages & Gastronomie',
    items: [
      'Road trips en Europe',
      'Cuisine asiatique',
      'Vins français',
      'Découverte de capitales',
      'Plats végétariens',
      'Trekking en Amérique du Sud',
      'Cafés de spécialité',
      'Marchés locaux',
    ],
  },
];

export default function UserSettings() {
  const { name, info, setName, setInfo } = useUser();
  const {
    apiKey,
    setApiKey,
    usageMode,
    setUsageMode,
    usageCount,
    loadFromLocalStorage,
  } = useAppConfig();
  const { setShowUserConfig } = useUI();

  const [localApiKey, setLocalApiKey] = useState('');
  const [selection, setSelection] = useState<'user' | 'limited' | null>(null);

  const isInitialSetup = !apiKey && usageMode !== 'limited';
  const isLimitedModeExhausted =
    usageMode === 'limited' && usageCount >= MAX_API_USES;

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  function handleSubmit() {
    if (selection === 'user') {
      if (localApiKey.trim()) {
        setApiKey(localApiKey);
        setUsageMode('user');
        if (!isInitialSetup) setShowUserConfig(false);
      }
    } else if (selection === 'limited') {
      setApiKey(DEV_API_KEY);
      setUsageMode('limited');
      if (!isInitialSetup) setShowUserConfig(false);
    }
  }

  function handleClose() {
    if (!isInitialSetup && !isLimitedModeExhausted) {
      setShowUserConfig(false);
    }
  }

  function handlePresetClick(preset: string) {
    setInfo(info ? `${info}, ${preset}` : preset);
  }

  const renderContent = () => {
    if (isLimitedModeExhausted && selection !== 'user') {
      return (
        <>
          <h3>Votre essai est terminé</h3>
          <p>
            Vous avez utilisé vos {MAX_API_USES} conversations d'essai. Pour
            continuer, veuillez fournir votre propre clé d'API Gemini.
          </p>
          {renderUserInfoForm()}
          {renderUserKeyForm()}
        </>
      );
    }

    if (selection) {
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {renderUserInfoForm()}
          {selection === 'user' && renderUserKeyForm()}
          {selection === 'limited' && (
            <div className="selection-confirmation">
              <p>
                Vous pouvez maintenant commencer à discuter ! Vous disposez de{' '}
                <strong>
                  {MAX_API_USES - usageCount} conversation(s) restante(s)
                </strong>
                .
              </p>
            </div>
          )}
          <button
            className="button primary"
            disabled={selection === 'user' && !localApiKey.trim()}
          >
            {selection === 'user' ? "C'est parti !" : 'Commencer'}
          </button>
        </form>
      );
    }

    return renderChoiceSelector();
  };

  const renderChoiceSelector = () => {
    const title = 'Bienvenue dans ton cercle de compagnons IA';
    return (
      <>
        <h2 className="animated-title">
          {title.split('').map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        <p>
          Choisissez comment vous souhaitez commencer. Vous pourrez toujours
          changer d'avis plus tard dans les paramètres.
        </p>
        <div className="choices-container">
          <div className="choice-card" onClick={() => setSelection('limited')}>
            <div className="icon">⏳</div>
            <h3>Essai Limité</h3>
            <p>
              Testez <strong>gratuitement</strong> l'application, sans clé API.
              Votre essai est limité à {MAX_API_USES} conversations.
            </p>
            <button className="button choice-button">Choisir</button>
          </div>
          <div className="choice-card" onClick={() => setSelection('user')}>
            <div className="icon">🔑</div>
            <h3>Accès Illimité</h3>
            <p>
              Apportez votre propre clé d'API Gemini pour une expérience sans
              limites. Le niveau gratuit de Google AI Studio est généreux et
              parfait pour commencer.
            </p>
            <button className="button choice-button">Choisir</button>
          </div>
        </div>
      </>
    );
  };

  const renderUserKeyForm = () => (
    <>
      <div className="api-key-form-section">
        <label htmlFor="apiKey">Votre clé d'API Gemini</label>
        <input
          type="password"
          id="apiKey"
          name="apiKey"
          value={localApiKey}
          onChange={e => setLocalApiKey(e.target.value)}
          placeholder="Collez votre clé d'API ici"
          required
        />
        <p className="api-key-explanation">
          Vous pouvez en obtenir une gratuitement sur{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google AI Studio
          </a>
          .
        </p>
      </div>
    </>
  );

  const renderUserInfoForm = () => (
    <>
      <h3 className="form-title">Vous et vos centres d'intérêts</h3>
      <p className="form-description">
        Pour enrichir vos dialogues, si vous le souhaitez, dites m'en plus sur
        vous !
      </p>
      <div>
        <div className="label-wrapper">
          <label htmlFor="name">Votre nom</label>
          <span className="optional-tag">optionnel</span>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Comment aimez-vous qu'on vous appelle ?"
        />
      </div>
      <div>
        <div className="label-wrapper">
          <label htmlFor="info">Vos centres d'intérêt</label>
          <span className="optional-tag">optionnel</span>
        </div>
        <textarea
          id="info"
          rows={3}
          name="info"
          value={info}
          onChange={e => setInfo(e.target.value)}
          placeholder="Ce que nous devrions savoir sur vous... Goûts, aversions, passe-temps, etc."
        />
      </div>
      <div className="preset-container">
        {presets.map(category => (
          <div key={category.category} className="preset-category">
            <h4>{category.category}</h4>
            <div className="preset-buttons">
              {category.items.map(item => (
                <button
                  key={item}
                  type="button"
                  className="preset-button"
                  onClick={() => handlePresetClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <Modal
      onClose={handleClose}
      showCloseButton={!isInitialSetup && !isLimitedModeExhausted}
    >
      <div className="userSettings">{renderContent()}</div>
    </Modal>
  );
}