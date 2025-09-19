# Changelog - Mon Cercle de Compagnons IA

## Version Actuelle (v1.0.2) - Janvier 2025

### ✅ Configuration PWA Complète (v1.0.2)

#### Progressive Web App (PWA)
- **Manifest.json enrichi** : Configuration complète avec catégories, raccourcis, et API de partage
- **Service Worker avancé** : Stratégies de cache multiples (network-first, cache-first, stale-while-revalidate)
- **Icônes complètes** : 19 tailles d'icônes PWA (48px à 512px) générées automatiquement
- **Support iOS** : Meta tags Apple et 26 écrans de démarrage pour tous les appareils iOS
- **Installation native** : Gestionnaire d'invite d'installation avec bouton flottant
- **Mise à jour automatique** : Mécanisme de détection et application des mises à jour
- **Mode hors ligne** : Page de fallback et stratégies de cache intelligentes
- **Optimisations Windows** : Configuration browserconfig.xml pour les tuiles Windows

#### Fonctionnalités PWA Avancées
- **Gestion d'installation** : Détection automatique de l'état d'installation (standalone, iOS)
- **Notifications de mise à jour** : Interface utilisateur pour les nouvelles versions
- **Cache intelligent** : Séparation des caches statiques, dynamiques et images avec limitation de taille
- **Stratégies réseau** : Adaptation automatique selon le type de ressource
- **Fallback hors ligne** : Page d'erreur avec vérification de connectivité et retry
- **Support multi-plateforme** : Installation native sur Android, iOS et Desktop

### ✅ Améliorations SEO et Déploiement (v1.0.1)

#### Optimisations SEO
- **Meta tags améliorés** : Ajout des balises author, robots, canonical, et language
- **Données structurées** : Implémentation JSON-LD Schema.org pour WebApplication
- **Open Graph optimisé** : Meta tags Facebook avec images et URLs complètes
- **Twitter Cards** : Configuration summary_large_image avec métadonnées complètes
- **Robots.txt** : Directives pour les moteurs de recherche avec sitemap
- **Sitemap.xml** : Plan du site pour l'indexation automatique
- **Nettoyage HTML** : Suppression des liens CSS et scripts dupliqués

#### Préparation Déploiement Vercel
- **vercel.json** : Configuration complète pour SPA routing et optimisations
- **Headers sécurisés** : X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Cache optimisé** : Stratégies de mise en cache pour assets statiques
- **Scripts de build** : Commandes optimisées pour production et déploiement
- **Redirections** : Configuration des redirections SEO-friendly
- **Variables d'environnement** : Gestion sécurisée pour production

### ✅ Fonctionnalités Implémentées (v1.0.0)

#### Interface Utilisateur
- **Interface principale** : Application React avec design moderne et responsive
- **Sélection de compagnons** : 12 compagnons IA prédéfinis avec personnalités uniques
- **Animations visuelles** : Visages animés synchronisés avec l'audio
- **Thèmes adaptatifs** : Support du mode sombre/clair automatique
- **Arrière-plans thématiques** : Environnements visuels correspondant à chaque compagnon

#### Fonctionnalités Audio
- **Enregistrement vocal** : Capture audio via microphone avec permissions
- **Streaming temps réel** : Communication bidirectionnelle avec l'API Gemini Live
- **Lecture audio** : Diffusion des réponses vocales des compagnons
- **Gestion des sessions** : Connexion/déconnexion automatique

#### Compagnons IA Disponibles
1. **Aria** - Assistante professionnelle (voix féminine, apparence moderne)
2. **Marcus** - Mentor sage (voix masculine, apparence distinguée)
3. **Luna** - Créative artistique (voix douce, style bohème)
4. **Victor** - Analyste technique (voix précise, look professionnel)
5. **Sage** - Philosophe contemplatif (voix posée, apparence sage)
6. **Echo** - Mystérieux énigmatique (voix intrigante, style sombre)
7. **Nova** - Exploratrice futuriste (voix dynamique, look sci-fi)
8. **River** - Naturel zen (voix apaisante, style naturel)
9. **Phoenix** - Leader inspirant (voix charismatique, apparence forte)
10. **Willow** - Empathique bienveillante (voix chaleureuse, style doux)
11. **Atlas** - Aventurier globe-trotter (voix énergique, look aventure)
12. **Iris** - Scientifique curieuse (voix intelligente, apparence académique)

#### Architecture Technique
- **Frontend** : React 18 + TypeScript + Vite
- **État global** : Zustand pour la gestion d'état
- **Styling** : Tailwind CSS avec thèmes adaptatifs
- **API** : Intégration Google Gemini Live API
- **Audio** : Web Audio API native
- **Build** : Configuration Vite optimisée

#### Configuration et Déploiement
- **Variables d'environnement** : Support des clés API Gemini
- **Permissions** : Gestion automatique des permissions microphone
- **Responsive** : Interface adaptée mobile/desktop
- **Performance** : Optimisations de rendu et mémoire

### 🔧 Configuration Requise
- **Node.js** : Version 18+ recommandée
- **Navigateur** : Support WebRTC et Web Audio API
- **Clé API** : Google AI Studio / Gemini API
- **Permissions** : Accès microphone obligatoire

---

## 🚀 Roadmap - Versions Futures

### Version 1.1.0 - Améliorations UX (Q1 2025)
- [ ] **Historique des conversations** : Sauvegarde locale des échanges
- [ ] **Personnalisation avancée** : Modification des paramètres de compagnons
- [ ] **Raccourcis clavier** : Navigation et contrôles rapides
- [ ] **Indicateurs visuels** : États de connexion et d'activité améliorés
- [ ] **Gestion d'erreurs** : Messages d'erreur plus informatifs

### Version 1.2.0 - Fonctionnalités Audio (Q2 2025)
- [ ] **Contrôle du volume** : Réglages audio individuels
- [ ] **Qualité audio** : Options de compression et qualité
- [ ] **Enregistrement local** : Sauvegarde des conversations audio
- [ ] **Effets sonores** : Ambiances et transitions audio
- [ ] **Support multi-langues** : Reconnaissance vocale multilingue

### Version 1.3.0 - Compagnons Avancés (Q3 2025)
- [ ] **Éditeur de compagnons** : Création de compagnons personnalisés
- [ ] **Mémoire contextuelle** : Continuité des conversations
- [ ] **Spécialisations** : Compagnons experts par domaine
- [ ] **Émotions dynamiques** : Expressions faciales réactives
- [ ] **Voix personnalisées** : Clonage et modification vocale

### Version 2.0.0 - Plateforme Collaborative (Q4 2025)
- [ ] **Comptes utilisateurs** : Authentification et profils
- [ ] **Partage de compagnons** : Communauté et marketplace
- [ ] **Conversations de groupe** : Multi-compagnons simultanés
- [ ] **Intégrations externes** : APIs tierces et webhooks
- [ ] **Analytics** : Statistiques d'usage et insights

---

## 📋 Notes de Développement

### Créateur
**Geoffroy Streit** - Développeur principal et concepteur de l'application

### Technologies Clés
- **Google AI Studio** : Plateforme de développement IA
- **Gemini Live API** : Moteur conversationnel temps réel
- **React Ecosystem** : Framework et outils modernes
- **Web Standards** : APIs natives du navigateur

### Références Techniques
- Documentation officielle Google AI Studio
- Spécifications Web Audio API
- Guidelines React 18 et TypeScript
- Bonnes pratiques Tailwind CSS

### Contribution
Pour contribuer au projet, consultez le fichier `README.md` et `todo.md` pour les améliorations prioritaires.

---

## [2024-01-XX] - Worklet Fixes and Multiple Solution Implementations

### Added
- **New Audio Worklet Strategies**: Implemented 4 different solutions for worklet loading issues
  - Solution 1: Fixed inline worklets with proper TypeScript syntax
  - Solution 2: Base64-embedded worklets (`audio-recorder-base64.ts`) - **NOW ACTIVE**
  - Solution 3: Dynamic imports with fallback mechanisms (`audio-recorder-dynamic.ts`)
  - Solution 4: ScriptProcessorNode fallback system (`audio-recorder-fallback.ts`)
- **TypeScript Declarations**: Added `?raw` import type declarations in `vite-env.d.ts`

### Changed
- **TypeScript Syntax in Worklets**: Removed ALL type annotations from worklet files to ensure JavaScript compatibility
  - Removed parameter types: `process(inputs: Float32Array[][])` → `process(inputs)`
  - Removed property types: `volume: number` → `volume`
  - Removed method parameter types: `processChunk(float32Array: Float32Array)` → `processChunk(float32Array)`
- **Audio Recorder Implementation**: **SWITCHED TO BASE64 SOLUTION** - worklets now embedded directly in bundle
- **MIME Type Configuration**: Updated Blob URLs to use `application/javascript` instead of `text/javascript`

### Fixed
- **Critical Issues Resolved**:
  - ❌ `AbortError: Unable to load a worklet's module` - **SOLVED** with base64 embedding
  - ❌ `SyntaxError: Unexpected identifier 'hasAudio'` - **SOLVED** by removing TypeScript syntax
  - ❌ `SyntaxError: Unexpected token ':'` - **SOLVED** by removing ALL TypeScript annotations
  - ❌ `Cannot find module './worklets/*.ts?raw'` - **SOLVED** with TypeScript declarations
  - ❌ **Multiplying console errors** - **SOLVED** by switching to base64 solution
- **4 Solutions Implemented**:
  1. **Inline Worklets**: Fixed syntax + proper Blob URLs
  2. **Base64 Embedding** ✅ **ACTIVE**: Worklets embedded directly in bundle
  3. **Dynamic Imports**: Multiple fallback strategies for loading
  4. **ScriptProcessor Fallback**: Compatible with all browsers

### Technical Details
- **Completely removed TypeScript syntax** from worklet files for JavaScript compatibility
- **Base64 worklets embedded** directly in bundle - no external file dependencies
- Simplified Vite configuration to avoid complex Rollup bundling issues
- Added proper event emission and cleanup mechanisms
- Implemented comprehensive error handling for all worklet loading scenarios
- Added `declare module '*?raw'` to resolve TypeScript module resolution errors
- **Zero external file dependencies** for worklets - guaranteed to work on Vercel

## [Unreleased]

### Added
- Initial project setup
- Basic AI companion functionality
- Multiple audio worklet loading strategies for production environments

### Changed
- Updated project structure
- Fixed TypeScript syntax errors in audio worklets
- Improved audio recorder implementation with better error handling

### Fixed
- Minor bug fixes
- **CRITICAL**: Fixed "AbortError: Unable to load a worklet's module" on Vercel production
- **CRITICAL**: Fixed "SyntaxError: Unexpected identifier 'hasAudio'" in worklet code
- Implemented 4 different solutions for worklet loading:
  1. **Solution 1**: Fixed syntax and improved ?raw imports with proper MIME types
  2. **Solution 2**: Base64 embedded worklets to avoid file loading issues
  3. **Solution 3**: Dynamic imports with comprehensive fallback mechanisms
  4. **Solution 4**: ScriptProcessorNode fallback for environments without worklet support
- **Audio Worklet Loading on Vercel**:
  - Refactored `audio-processing.ts` and `vol-meter.ts` to be self-registering `AudioWorkletProcessor`s, removing the need for Blob URLs.
  - Updated `vite.config.ts` to treat worklet files as assets with stable URLs using the `?url` import suffix.
  - This resolves the issue where audio worklets failed to load in the Vercel production environment due to restrictive Content Security Policies.
  - Removed the now-redundant `audioworklet-registry.ts` and `createWorketFromSrc` function.
  - Updated `audio-streamer.ts`, `audio-recorder.ts`, and `use-live-api.ts` to use the new URL-based worklet loading mechanism.

### Technical Details
- Removed TypeScript type annotations from worklet files that caused parsing errors
- Updated audio-recorder.ts to use proper Blob creation with 'application/javascript' MIME type
- Created alternative implementations for different deployment scenarios
- Simplified Vite configuration to avoid complex Rollup bundling issues

### Terminé
- Correction du pattern regex dans vercel.json pour le déploiement Vercel
  - Échappement correct des backslashes dans le pattern de fichiers statiques
  - Résolution de l'erreur "Header at index 2 has invalid source pattern"

### À faire
- Tests d'intégration complets
- Optimisation des performances audio
- Documentation technique détaillée

---

*Dernière mise à jour : Janvier 2025*