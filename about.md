
# À Propos de Mon Cercle de Compagnons IA

## Créateur
**Geoffroy Streit** - Développeur et créateur de cette application innovante d'IA conversationnelle.

## Concept

Mon Cercle de Compagnons IA est une application web révolutionnaire qui transforme l'interaction avec l'intelligence artificielle. Plus qu'un simple chatbot, c'est une plateforme immersive qui permet de converser en temps réel avec des compagnons IA dotés de personnalités uniques et distinctes.

L'application propose une collection de 12 compagnons IA, chacun avec sa propre personnalité, voix, apparence et domaine d'expertise :
- **Mat le Geek** 💻 - Expert en technologie et jeux vidéo
- **Charlotte la Chic** 👠 - Experte mode et élégance
- **Paul le Protocolaire** 🫖 - Maître de l'étiquette
- **Chef Simon** 🍳 - Virtuose culinaire
- **Penny la Globe-trotteuse** ✈️ - Aventurière mondiale
- **Dr. ZweiStein** 👨‍🔬 - Scientifique passionné
- **Julie Pop** 🎬 - Encyclopédie de culture pop
- **Priscilla Machiavel** ♟️ - Stratège manipulatrice
- **Jacques le Conteur** 🎭 - Maître des histoires
- **Mercredi l'Artiste** 🎻 - Âme sombre et créative
- **Gui le Coach** 💪 - Motivateur sportif
- **Cécile la Juriste** ⚖️ - Experte juridique

## Fonctionnalités Principales

### 🎙️ Conversation Audio en Temps Réel
- Streaming audio bidirectionnel avec latence ultra-faible
- Reconnaissance vocale instantanée
- Synthèse vocale naturelle avec 8 voix différentes
- Animation faciale synchronisée avec la parole

### 🎨 Personnalisation Avancée
- Éditeur de compagnons intégré
- Personnalisation de l'apparence (couleurs, formes des yeux, accessoires)
- Modification de la personnalité et du comportement
- Thèmes visuels dynamiques avec motifs animés

### 👤 Gestion Utilisateur
- Profils utilisateur personnalisables
- Centres d'intérêt configurables
- Deux modes d'utilisation : limité (gratuit) et utilisateur (clé API)
- Sauvegarde locale des préférences

### 📱 Interface Moderne
- Design responsive adaptatif
- Thèmes sombre/clair automatiques
- Interface intuitive et accessible
- Animations fluides et feedback visuel

## Architecture Technique

### Stack Technologique
- **Frontend** : React 19.1.0 avec TypeScript
- **Build Tool** : Vite 6.3.5 pour un développement rapide
- **State Management** : Zustand 5.0.5 pour une gestion d'état simple
- **IA** : Google Gemini Live API (@google/genai 1.4.0)
- **Audio** : Web Audio API avec AudioWorklets personnalisés
- **Styling** : CSS moderne avec variables thématiques

### Composants Clés
- **LiveAPIContext** : Gestion de la connexion WebSocket avec Gemini
- **AudioRecorder** : Capture et traitement audio en temps réel
- **BasicFace** : Animation faciale réactive au volume
- **CompanionDock** : Interface de contrôle principal
- **AgentEdit** : Éditeur de compagnons en temps réel

### Gestion Audio Avancée
- **AudioWorklets** pour le traitement audio de bas niveau
- Conversion PCM16 pour l'API Gemini
- Analyse de volume en temps réel
- Streaming bidirectionnel optimisé

## Déploiement et Hébergement

L'application est conçue pour être déployée sur **Vercel.com**, offrant :
- Déploiement automatique depuis Git
- CDN global pour des performances optimales
- HTTPS automatique
- Variables d'environnement sécurisées

## Objectifs du Projet

1. **Innovation UX** : Repenser l'interaction homme-IA avec des conversations naturelles
2. **Démonstration Technique** : Showcaser les capacités de Gemini Live API
3. **Code de Référence** : Fournir une base solide pour d'autres développeurs
4. **Accessibilité** : Rendre l'IA conversationnelle accessible au grand public
5. **Créativité** : Explorer le potentiel artistique et narratif de l'IA

## Sécurité et Confidentialité

- Gestion sécurisée des clés API
- Aucune donnée utilisateur stockée côté serveur
- Chiffrement des communications WebSocket
- Respect des bonnes pratiques de sécurité web

Cette application représente l'avenir de l'interaction avec l'IA : naturelle, personnalisée et profondément humaine.