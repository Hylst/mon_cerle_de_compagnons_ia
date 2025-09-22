# Structure du Projet Mon cercle de compagnons IA

**Créateur :** Geoffroy Streit  
**Hébergement :** Vercel.com  
**Statut :** Fonctionnel en local, prêt pour le déploiement

Ce document fournit une analyse détaillée de l'organisation du code source de l'application Mon cercle de compagnons IA. Il est destiné aux développeurs qui souhaitent comprendre l'architecture, le flux de données et le rôle de chaque partie du code.

## Vue d'ensemble de l'architecture

L'application est une **Single Page Application (SPA)** entièrement côté client, construite avec React 18 et TypeScript. Elle communique directement avec l'API Google Gemini Live via une connexion WebSocket, sans nécessiter de serveur backend personnalisé.

### Stack Technique Principal
- **Frontend :** React 18.3.1 + TypeScript 5.5.3
- **Build Tool :** Vite 5.4.1
- **State Management :** Zustand 4.5.5
- **AI Integration :** @google/generative-ai 0.17.1
- **Audio Processing :** Web Audio API + AudioWorklets
- **Styling :** CSS3 avec variables CSS pour le theming
- **Deployment :** Vercel (configuration automatique)

L'état global est géré par **Zustand** avec persistance localStorage, et la logique de traitement audio de bas niveau est déléguée à la **Web Audio API** via des AudioWorklets personnalisés.

## Arborescence des Fichiers

```
.
├── components/
│   ├── demo/
│   │   ├── basic-face/
│   │   │   ├── BasicFace.tsx          # Composant principal du visage animé
│   │   │   └── basic-face-render.ts   # Logique de dessin sur le canvas
│   │   ├── keynote-companion/
│   │   │   └── KeynoteCompanion.tsx   # Conteneur de la démo principale
│   │   └── ErrorScreen.tsx            # Écran d'erreur
│   ├── AgentEdit.tsx                  # Modale pour éditer un agent
│   ├── CompanionDock.tsx              # Barre latérale/inférieure avec les agents et contrôles
│   ├── Header.tsx                     # En-tête avec sélection de l'agent
│   ├── Modal.tsx                      # Composant générique de modale
│   ├── ThematicBackground.tsx         # Arrière-plan thématique animé
│   └── UserSettings.tsx               # Modale pour les infos utilisateur
├── contexts/
│   └── LiveAPIContext.tsx             # Fournisseur de contexte pour l'API Live
├── hooks/
│   ├── demo/
│   │   ├── use-face.ts                # Hook pour l'animation du visage
│   │   └── use-thematic-background.ts # Hook pour l'arrière-plan thématique
│   ├── media/
│   │   └── use-live-api.ts            # Hook principal pour l'API Live
│   ├── use-agent.ts                   # Hook pour la gestion des agents
│   ├── use-app-config.ts              # Hook pour la configuration de l'app
│   ├── use-input-audio.ts             # Hook pour l'audio d'entrée
│   ├── use-ui.ts                      # Hook pour l'état de l'interface
│   └── use-user.ts                    # Hook pour les données utilisateur
├── lib/
│   ├── presets/
│   │   └── agents.ts                  # Définitions des 12 agents prédéfinis
│   ├── audio-recorder.ts              # Classe pour l'enregistrement audio
│   ├── audio-streamer.ts              # Classe pour la lecture audio
│   ├── state.ts                       # Configuration des stores Zustand
│   └── utils.ts                       # Utilitaires généraux
├── public/
│   ├── worklets/
│   │   ├── audio-recording-worklet.js # Worklet pour l'enregistrement
│   │   └── vol-meter-worklet.js       # Worklet pour la mesure du volume
│   ├── banner.png                     # Image de bannière
│   └── vite.svg                       # Logo Vite
├── App.tsx                            # Composant racine de l'application
├── index.tsx                          # Point d'entrée React
├── index.css                          # Styles globaux et variables CSS
├── index.html                         # Template HTML principal
├── vite.config.ts                     # Configuration Vite
├── tsconfig.json                      # Configuration TypeScript
├── package.json                       # Dépendances et scripts
├── .env.local                         # Variables d'environnement (API keys)
├── .gitignore                         # Fichiers ignorés par Git
├── about.md                           # Documentation détaillée du projet
├── readme.md                          # Guide d'installation et d'utilisation
└── structure.md                       # Ce fichier
```

## Architecture des Composants

### Composants Principaux

#### 1. App.tsx
- **Rôle :** Composant racine qui orchestre toute l'application
- **Responsabilités :**
  - Initialisation du service worker
  - Gestion de l'affichage conditionnel des paramètres utilisateur
  - Wrapping avec LiveAPIProvider
  - Gestion des erreurs globales

#### 2. KeynoteCompanion.tsx
- **Rôle :** Composant central qui affiche le visage animé (BasicFace)
- **Responsabilités :**
  - Configuration de l'API Live (instructions système, voix)
  - Initialisation de la session avec message de bienvenue
  - Gestion des modalités de réponse (audio, texte)

#### 3. CompanionDock.tsx
- **Rôle :** Centre de contrôle principal de l'application
- **Responsabilités :**
  - Sélection et création d'agents IA
  - Contrôle de la connexion (Play/Pause)
  - Gestion du microphone (activation/désactivation)
  - Instanciation de l'AudioRecorder
  - Envoi des données audio vers l'API
  - Interface adaptative (desktop: dock inférieur, mobile: menu latéral)

#### 4. BasicFace.tsx
- **Rôle :** Composant d'affichage du visage animé
- **Responsabilités :**
  - Rendu du visage sur canvas HTML5
  - Animation de la bouche basée sur le volume audio
  - Gestion des expressions et émotions
  - Adaptation responsive

### Composants Utilitaires

#### 5. Header.tsx & AgentEdit.tsx
- **Rôle :** Interface de gestion des agents
- **Responsabilités :**
  - Sélection d'agent actif
  - Édition des propriétés d'agent (nom, visage, voix, thème)
  - Prévisualisation des modifications
  - Sauvegarde dans le store Zustand

#### 6. UserSettings.tsx
- **Rôle :** Configuration des préférences utilisateur
- **Responsabilités :**
  - Collecte des centres d'intérêt
  - Personnalisation de l'expérience
  - Intégration avec les instructions système

## Gestion d'État avec Zustand

### Stores Principaux

1. **useAppConfig** - Configuration globale de l'application
2. **useUser** - Données et préférences utilisateur
3. **useInputAudio** - État de l'audio d'entrée
4. **useAgent** - Gestion des agents IA (actuel, liste, édition)
5. **useUI** - État de l'interface utilisateur (modales, menus)

Tous les stores utilisent la persistance localStorage pour maintenir l'état entre les sessions.

## Flux de Données Audio

### Entrée Audio (Utilisateur → API)
1. **Capture :** AudioRecorder capture l'audio du microphone
2. **Traitement :** AudioRecordingWorklet traite et convertit en base64
3. **Transmission :** CompanionDock reçoit les données et les envoie via useLiveAPIContext
4. **Envoi :** GenAILiveClient transmet à l'API Gemini via WebSocket

### Sortie Audio (API → Utilisateur)
1. **Réception :** GenAILiveClient reçoit les chunks audio en base64
2. **Décodage :** Conversion en ArrayBuffer et émission d'événement audio
3. **Streaming :** AudioStreamer met en file d'attente et joue l'audio
4. **Analyse :** VolMeterWorklet mesure le volume en temps réel
5. **Animation :** BasicFace utilise le volume pour animer la bouche

## Configuration et Déploiement

### Variables d'Environnement
```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

### Scripts NPM
- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build

### Déploiement Vercel
- Configuration automatique via `vercel.json` (optionnel)
- Variables d'environnement configurées dans le dashboard Vercel
- Build automatique à chaque push sur la branche principale

## Sécurité et Bonnes Pratiques

### Gestion des Clés API
- Clés stockées dans variables d'environnement
- Validation côté client avant utilisation
- Pas de clés hardcodées dans le code source

### Performance
- Lazy loading des composants non critiques
- Optimisation des re-renders avec React.memo
- Gestion efficace de la mémoire audio
- Compression des assets statiques

### Accessibilité
- Support clavier complet
- Attributs ARIA appropriés
- Contraste de couleurs respecté
- Interface responsive

## Extensions Futures

### Fonctionnalités Prévues
- Sauvegarde cloud des agents personnalisés
- Intégration de nouveaux modèles IA
- Mode multi-agents (conversations de groupe)
- Historique des conversations
- Thèmes personnalisables avancés

### Architecture Évolutive
- Structure modulaire permettant l'ajout facile de nouveaux composants
- Hooks réutilisables pour l'intégration d'autres APIs
- Système de plugins pour les extensions tierces
