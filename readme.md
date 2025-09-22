# Mon Cercle de Compagnons IA

<div align="center">

![Mon Cercle de Compagnons IA](https://img.shields.io/badge/IA-Conversationnelle-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)
![Gemini](https://img.shields.io/badge/Gemini-Live_API-4285F4?style=for-the-badge&logo=google)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel)

**Une application révolutionnaire d'IA conversationnelle avec 12 compagnons uniques**

*Créé par Geoffroy Streit*

</div>

## 🚀 Aperçu

Mon Cercle de Compagnons IA transforme l'interaction avec l'intelligence artificielle en proposant des conversations audio en temps réel avec des compagnons IA dotés de personnalités distinctes. Chaque compagnon possède sa propre voix, apparence et expertise, créant une expérience immersive et personnalisée.

### ✨ Fonctionnalités Principales

- 🎙️ **Conversation Audio Temps Réel** - Streaming bidirectionnel ultra-rapide
- 🤖 **12 Compagnons Uniques** - Personnalités, voix et expertises variées
- 🎨 **Personnalisation Complète** - Éditeur intégré pour créer vos propres compagnons
- 📱 **Interface Moderne** - Design responsive avec thèmes adaptatifs
- 🔊 **Animation Faciale** - Synchronisation avec la parole en temps réel
- 👤 **Profils Utilisateur** - Personnalisation des centres d'intérêt

### 🎭 Les Compagnons

| Compagnon | Expertise | Personnalité |
|-----------|-----------|--------------|
| 💻 **Mat le Geek** | Tech & Gaming | Énergique et passionné |
| 👠 **Charlotte la Chic** | Mode & Style | Sophistiquée et raffinée |
| 🫖 **Paul le Protocolaire** | Étiquette | Formel avec humour sec |
| 🍳 **Chef Simon** | Cuisine | Optimiste et créatif |
| ✈️ **Penny la Globe-trotteuse** | Voyages | Décontractée et aventureuse |
| 👨‍🔬 **Dr. ZweiStein** | Sciences | Brillant et excentrique |
| 🎬 **Julie Pop** | Culture Pop | Déjantée et divertissante |
| ♟️ **Priscilla Machiavel** | Stratégie | Manipulatrice et charmante |
| 🎭 **Jacques le Conteur** | Littérature | Théâtral et imaginatif |
| 🎻 **Mercredi l'Artiste** | Art | Sombre et mélancolique |
| 💪 **Gui le Coach** | Sport | Motivant et énergique |
| ⚖️ **Cécile la Juriste** | Droit | Rigoureuse et directe |

## 🛠️ Installation et Développement

### Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**
- **Clé API Gemini** (obtenir sur [Google AI Studio](https://aistudio.google.com/))

### Installation Locale

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/mon-cercle-de-compagnons-ia-v2.git
   cd mon-cercle-de-compagnons-ia-v2
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   
   Créer un fichier `.env.local` à la racine :
   ```env
   GEMINI_API_KEY=votre_clé_api_gemini_ici
   ```

4. **Lancer l'application**
   ```bash
   npm run dev
   ```

5. **Accéder à l'application**
   
   Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

### Scripts Disponibles

```bash
npm run dev      # Démarrage en mode développement
npm run build    # Construction pour la production
npm run preview  # Prévisualisation de la version de production
```

## 🌐 Déploiement sur Vercel

### Déploiement Automatique

1. **Fork le repository** sur GitHub
2. **Connecter à Vercel** :
   - Aller sur [vercel.com](https://vercel.com)
   - Importer votre repository GitHub
   - Configurer les variables d'environnement

3. **Variables d'environnement Vercel** :
   ```
   GEMINI_API_KEY = votre_clé_api_gemini
   ```

4. **Déployer** - Vercel déploie automatiquement à chaque push

### Déploiement Manuel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

## 🏗️ Architecture Technique

### Stack Technologique

- **Frontend** : React 19.1.0 + TypeScript 5.8.2
- **Build Tool** : Vite 6.3.5
- **State Management** : Zustand 5.0.5
- **IA** : Google Gemini Live API (@google/genai 1.4.0)
- **Audio** : Web Audio API + AudioWorklets
- **Styling** : CSS moderne avec variables thématiques

### Structure du Projet

```
├── components/          # Composants React réutilisables
│   ├── demo/           # Composants de démonstration
│   └── console/        # Composants de contrôle
├── contexts/           # Contextes React (LiveAPI)
├── hooks/              # Hooks personnalisés
│   ├── demo/          # Hooks pour les démos
│   └── media/         # Hooks audio/vidéo
├── lib/               # Utilitaires et logique métier
│   ├── presets/       # Définitions des compagnons
│   └── worklets/      # AudioWorklets
├── public/            # Assets statiques
└── dist/              # Build de production
```

### Composants Clés

- **`LiveAPIContext`** - Gestion WebSocket avec Gemini
- **`AudioRecorder`** - Capture audio temps réel
- **`BasicFace`** - Animation faciale réactive
- **`CompanionDock`** - Interface de contrôle principal
- **`AgentEdit`** - Éditeur de compagnons

## 🔧 Configuration Avancée

### Personnalisation des Compagnons

Les compagnons sont définis dans `lib/presets/agents.ts`. Chaque compagnon inclut :

```typescript
export type Agent = {
  id: string;              // Identifiant unique
  name: string;            // Nom affiché
  personality: string;     // Instructions de personnalité
  bodyColor: string;       // Couleur principale
  voice: INTERLOCUTOR_VOICE; // Voix Gemini
  eyeShape: EyeShape;      // Forme des yeux
  icon: string;            // Icône Material
  theme: AgentTheme;       // Thème visuel
  accessory: Accessory;    // Accessoire visuel
};
```

### Gestion Audio

L'application utilise des AudioWorklets pour :
- Capture microphone en PCM16
- Analyse de volume temps réel
- Streaming bidirectionnel optimisé

## 🔒 Sécurité

- ✅ Gestion sécurisée des clés API
- ✅ Aucune donnée stockée côté serveur
- ✅ Communications WebSocket chiffrées
- ✅ Variables d'environnement protégées
- ✅ Validation des entrées utilisateur

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence Apache 2.0. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Créateur

**Geoffroy Streit**
- Développeur Full-Stack passionné d'IA
- Créateur de Mon Cercle de Compagnons IA

## 🙏 Remerciements

- Google pour l'API Gemini Live
- La communauté React pour les outils exceptionnels
- Vercel pour l'hébergement gratuit
- Tous les contributeurs et testeurs

---

<div align="center">

**[🌐 Démo en Ligne](https://votre-app.vercel.app)** | **[📖 Documentation](about.md)** | **[🏗️ Architecture](structure.md)**

*Transformez vos conversations avec l'IA - Une personnalité à la fois*

</div>
