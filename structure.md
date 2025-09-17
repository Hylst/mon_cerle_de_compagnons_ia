
# Structure du Projet Mon cercle de compagnons IA

**Créateur :** Geoffroy Streit  
**Technologie principale :** Google AI Studio / Gemini Live API  
**Type d'application :** Interface conversationnelle IA en temps réel

Ce document fournit une analyse complète de l'organisation du code source de l'application "Mon cercle de compagnons IA". Il est destiné aux développeurs qui souhaitent comprendre l'architecture, le flux de données et le rôle de chaque partie du code.

## Analyse Générale

### Catégorie et Finalité
- **Catégorie :** Application de démonstration technologique / Interface conversationnelle IA
- **Finalité :** Démontrer les capacités de l'API Gemini Live dans la création d'expériences conversationnelles immersives
- **Public cible :** Développeurs souhaitant intégrer l'API Gemini Live, utilisateurs intéressés par l'IA conversationnelle
- **Valeur ajoutée :** Personnalisation poussée des compagnons IA avec personnalités uniques et animations visuelles

### Références Identifiées
- **Google AI Studio :** Mentionné dans README.md, UserSettings.tsx, ErrorScreen.tsx
- **Lien AI Studio :** https://ai.studio/apps/drive/1yIvNOLkzK2ncPPsWqvUSMwCwPFVCJ6QF
- **Auteur :** Geoffroy Streit (mentionné dans le footer de App.tsx : "Propulsé par Gemini - Remixé par Geoffroy Streit")
- **Copyright :** Google LLC 2024 (licence Apache 2.0)

## Vue d'ensemble de l'architecture

L'application est une **Single Page Application (SPA)** entièrement côté client, construite avec React et TypeScript. Elle communique directement avec l'API Google Gemini Live via une connexion WebSocket, sans nécessiter de serveur backend personnalisé.

**Technologies clés :**
- **Frontend :** React 19.1.0 + TypeScript 5.8.2
- **Build :** Vite 6.3.5 (configuration ES modules)
- **État global :** Zustand 5.0.5
- **IA :** @google/genai 1.4.0 (Gemini Live API)
- **Audio :** Web Audio API + AudioWorklets
- **Styling :** CSS natif avec thèmes dynamiques

## Arborescence des Fichiers

```
.
├── components/
│   ├── demo/
│   │   ├── basic-face/
│   │   │   ├── BasicFace.tsx          # Composant principal du visage animé
│   │   │   └── basic-face-render.ts   # Logique de dessin sur le canvas
│   │   ├── keynote-companion/
│   │   │   └── KeynoteCompanion.tsx # Conteneur de la démo principale
│   │   └── ErrorSreen.tsx         # Écran d'erreur
│   ├── AgentEdit.tsx            # Modale pour éditer un agent
│   ├── CompanionDock.tsx        # Barre latérale/inférieure avec les agents et contrôles
│   ├── Header.tsx               # En-tête avec sélection de l'agent
│   ├── Modal.tsx                # Composant générique de modale
│   ├── ThematicBackground.tsx   # Arrière-plan thématique animé
│   └── UserSettings.tsx         # Modale pour les infos utilisateur
├── contexts/
│   └── LiveAPIContext.tsx       # Fournisseur de contexte pour l'API Live
├── hooks/
│   ├── demo/
│   │   ├── use-face.ts          # Hook pour l'animation des yeux/bouche
│   │   ├── use-hover.ts         # Hook pour l'animation de lévitation
│   │   └── use-tilt.ts          # Hook pour l'animation d'inclinaison
│   └── media/
│       └── use-live-api.ts      # Hook principal pour la logique de l'API
├── lib/
│   ├── worklets/
│   │   ├── audio-processing.ts  # Worklet pour l'enregistrement audio
│   │   └── vol-meter.ts         # Worklet pour mesurer le volume
│   ├── audio-recorder.ts        # Classe pour enregistrer le micro
│   ├── audio-streamer.ts        # Classe pour jouer l'audio de l'API
│   ├── audioworklet-registry.ts # Utilitaire pour les worklets
│   ├── constants.ts             # Constantes (nom du modèle)
│   ├── genai-live-client.ts     # Wrapper autour de l'API Gemini Live
│   ├── presets/
│   │   └── agents.ts            # Définitions des agents prédéfinis
│   ├── prompts.ts               # Génération des instructions système
│   ├── state.ts                 # Store Zustand (état global)
│   └── utils.ts                 # Fonctions utilitaires
├── App.tsx                      # Composant racine de l'application
├── index.css                    # Styles CSS
├── index.html                   # Fichier HTML d'entrée (avec importmap)
├── index.tsx                    # Point d'entrée React
└── metadata.json                # Métadonnées de l'application
```

## Compagnons IA Prédéfinis

L'application propose **12 compagnons IA** avec des personnalités distinctes :

### Compagnons Disponibles
1. **Charlotte** - Assistante bienveillante et organisée
2. **Paul** - Compagnon analytique et réfléchi
3. **Shane** - Personnalité dynamique et créative
4. **Penny** - Approche empathique et chaleureuse
5. **ZweiStein** - Expert scientifique et logique
6. **Mat** - Compagnon décontracté et accessible
7. **Julie** - Personnalité énergique et motivante
8. **Priscilla** - Raffinée et cultivée
9. **Jacques** - Sage et expérimenté
10. **Mercredi** - Mystérieuse et intrigante
11. **Gui** - Technique et précis
12. **Cecile** - Douce et patiente

### Caractéristiques des Compagnons
Chaque compagnon possède :
- **Personnalité unique** : Traits de caractère définis
- **Voix distinctive** : Différents types de voix (alloy, echo, fable, onyx, nova, shimmer)
- **Apparence visuelle** : Couleurs, formes d'yeux, accessoires
- **Thème graphique** : Dégradés et motifs personnalisés

## Description des Modules Clés

### `lib/` - La Logique Métier

-   **`genai-live-client.ts`** : C'est une classe wrapper qui simplifie l'interaction avec `@google/genai`. Elle expose une interface basée sur des événements (`on('audio')`, `on('error')`, etc.) en utilisant `EventEmitter3`, masquant la complexité de la gestion de la session WebSocket. Intégration avec le modèle "gemini-2.5-flash-preview-native-audio-dialog".
-   **`state.ts`** : Définit le store Zustand, qui est divisé en plusieurs "slices" pour gérer l'état de l'utilisateur, des agents et de l'interface. Inclut la gestion des agents personnels et des compteurs d'usage.
-   **`audio-recorder.ts`** : Utilise `navigator.mediaDevices.getUserMedia` pour accéder au microphone. Il envoie le flux audio à un `AudioWorklet` (`audio-processing.ts`) qui le convertit en PCM 16 bits, le met en mémoire tampon et l'émet sous forme de chaînes base64. Gestion des permissions microphone.
-   **`audio-streamer.ts`** : Reçoit les tampons audio (ArrayBuffer) de l'API Gemini. Il les met en file d'attente et les joue de manière fluide en utilisant la Web Audio API. Il utilise également un `AudioWorklet` (`vol-meter.ts`) pour mesurer le volume de sortie, information cruciale pour l'animation de la bouche.
-   **`prompts.ts`** : Contient la logique pour construire dynamiquement les `systemInstruction` envoyées à l'API, en combinant la personnalité de l'agent et les informations de l'utilisateur.

### `hooks/` - La Logique Réutilisable

-   **`media/use-live-api.ts`** : Le hook le plus important de l'application. Il instancie le `GenAILiveClient` et l'`AudioStreamer`. Il expose des fonctions (`connect`, `disconnect`) et des états (`connected`, `volume`) que les composants peuvent utiliser. C'est le pont entre l'interface React et la logique de l'API.
-   **`demo/*`** : Une collection de hooks purement visuels (`use-tilt`, `use-hover`, `use-face`) qui gèrent les animations du personnage pour le rendre plus vivant.

### `components/` - La Couche de Présentation

-   **`demo/keynote-companion/KeynoteCompanion.tsx`** : Le composant central qui affiche le `BasicFace`. C'est ici que la configuration de l'API (instructions système, voix) est définie via le `LiveAPIContext`.
-   **`CompanionDock.tsx`** : Le centre de contrôle principal de l'application. Sur ordinateur, il s'affiche en bas de l'écran ; sur mobile, il se transforme en menu latéral. Il permet de :
    -   Changer d'agent IA.
    -   Créer un nouvel agent.
    -   Contrôler la connexion (Play/Pause).
    -   Activer/Désactiver le microphone.
    Il instancie également l'`AudioRecorder` et gère l'envoi des données audio vers l'API.
-   **`Header.tsx`** & **`AgentEdit.tsx`** : Composants qui interagissent avec le store Zustand (`useAgent`) pour permettre à l'utilisateur de sélectionner et de personnaliser les agents. Sur mobile, le header permet également d'ouvrir le `CompanionDock`.

## Architecture des Composants

### Composants Principaux

#### `App.tsx` - Composant Racine
- **Rôle :** Point d'entrée de l'application
- **Responsabilités :**
  - Gestion de l'état global (useUI, useAppConfig, useAgent)
  - Logique de forçage des paramètres utilisateur
  - Intégration des contextes (LiveAPIProvider)
  - Rendu conditionnel (ErrorScreen vs interface principale)

#### `components/KeynoteCompanion.tsx` - Interface Principale
- **Rôle :** Interface de conversation avec le compagnon IA
- **Fonctionnalités :**
  - Affichage du compagnon IA avec animations
  - Contrôles de conversation (micro, paramètres)
  - Visualisation en temps réel du volume audio

#### `components/Header.tsx` - Navigation
- **Rôle :** Barre de navigation et contrôles principaux
- **Éléments :** Menu, sélection d'agent, paramètres utilisateur

#### `components/ThematicBackground.tsx` - Arrière-plan Dynamique
- **Rôle :** Arrière-plan adaptatif selon le thème du compagnon
- **Fonctionnalités :** Dégradés et motifs personnalisés

### Composants de Configuration

#### `components/UserSettings.tsx`
- **Rôle :** Configuration utilisateur et API
- **Fonctionnalités :**
  - Gestion de la clé API Gemini
  - Informations personnelles utilisateur
  - Références à Google AI Studio

#### `components/AgentEdit.tsx`
- **Rôle :** Éditeur de compagnons IA personnalisés
- **Fonctionnalités :**
  - Création/modification d'agents
  - Personnalisation visuelle et vocale
  - Définition de personnalités

## Schéma du Flux de Données Audio

### Entrée (Utilisateur -> API)

1.  **Utilisateur parle**
2.  `AudioRecorder` capture l'audio du microphone.
3.  `AudioRecordingWorklet` le traite et l'émet en base64.
4.  Le composant `CompanionDock` reçoit les données.
5.  `CompanionDock` appelle `client.sendRealtimeInput` via le `useLiveAPIContext`.
6.  `GenAILiveClient` envoie les données à l'API Gemini via WebSocket.

### Sortie (API -> Utilisateur)

1.  **API Gemini** envoie des morceaux audio (chunks) en base64 via WebSocket.
2.  `GenAILiveClient` reçoit le message, le décode en `ArrayBuffer` et émet un événement `audio`.
3.  Le hook `useLiveApi` écoute cet événement et passe les données à l'`AudioStreamer`.
4.  `AudioStreamer` met en file d'attente et joue l'audio via la Web Audio API.
5.  Simultanément, `VolMeterWorklet` analyse le volume de l'audio joué.
6.  Le hook `useLiveApi` met à jour l'état `volume`.
7.  Le composant `BasicFace` lit l'état `volume` et met à jour l'ouverture de la bouche sur le canvas.
8.  La personnalité du compagnon sélectionné influence la voix et le style de réponse de l'API.
