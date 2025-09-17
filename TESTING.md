# Guide de Test et d'Accès - Mon Cercle de Compagnons IA

## 🚀 Comment Accéder à l'Application

### Prérequis Système
- **Node.js** : Version 18.0.0 ou supérieure
- **Navigateur moderne** : Chrome, Firefox, Safari, Edge (avec support WebRTC)
- **Connexion Internet** : Requise pour l'API Gemini Live
- **Microphone** : Obligatoire pour les interactions vocales

### Installation et Configuration

#### 1. Cloner et Installer
```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd mon-cercle-de-compagnons-ia

# Installer les dépendances
npm install
```

#### 2. Configuration de l'API Gemini
```bash
# Créer le fichier d'environnement
cp .env.example .env

# Éditer le fichier .env
GEMINI_API_KEY=votre_clé_api_gemini_ici
```

**Obtenir une clé API :**
1. Aller sur [Google AI Studio](https://aistudio.google.com/)
2. Se connecter avec un compte Google
3. Créer une nouvelle clé API
4. Copier la clé dans le fichier `.env`

#### 3. Lancement de l'Application
```bash
# Mode développement
npm run dev

# L'application sera accessible sur :
# http://localhost:5173
```

---

## 🧪 Guide de Test Complet

### Tests Fonctionnels de Base

#### Test 1 : Chargement de l'Application
- [ ] **Objectif** : Vérifier que l'application se charge correctement
- [ ] **Étapes** :
  1. Ouvrir `http://localhost:5173`
  2. Vérifier l'affichage de l'interface principale
  3. Confirmer la présence des 12 compagnons
- [ ] **Résultat attendu** : Interface complète sans erreurs console

#### Test 2 : Permissions Microphone
- [ ] **Objectif** : Valider la demande de permissions audio
- [ ] **Étapes** :
  1. Cliquer sur un compagnon
  2. Autoriser l'accès au microphone
  3. Vérifier l'indicateur de permission
- [ ] **Résultat attendu** : Permission accordée, indicateur vert

#### Test 3 : Sélection de Compagnon
- [ ] **Objectif** : Tester la sélection et l'affichage des compagnons
- [ ] **Étapes** :
  1. Cliquer sur différents compagnons
  2. Observer les changements d'interface
  3. Vérifier les arrière-plans thématiques
- [ ] **Résultat attendu** : Interface mise à jour, animations fluides

#### Test 4 : Connexion API Gemini
- [ ] **Objectif** : Valider la connexion à l'API
- [ ] **Étapes** :
  1. Sélectionner un compagnon
  2. Observer l'état de connexion
  3. Vérifier les logs de connexion
- [ ] **Résultat attendu** : Connexion établie, pas d'erreurs API

### Tests d'Interaction Vocale

#### Test 5 : Enregistrement Audio
- [ ] **Objectif** : Tester la capture audio
- [ ] **Étapes** :
  1. Maintenir le bouton d'enregistrement
  2. Parler clairement pendant 3-5 secondes
  3. Relâcher le bouton
- [ ] **Résultat attendu** : Indicateur d'enregistrement actif, audio capturé

#### Test 6 : Réponse du Compagnon
- [ ] **Objectif** : Valider la réponse vocale
- [ ] **Étapes** :
  1. Envoyer un message vocal simple
  2. Attendre la réponse du compagnon
  3. Vérifier la lecture audio
- [ ] **Résultat attendu** : Réponse audible, animations synchronisées

#### Test 7 : Conversation Continue
- [ ] **Objectif** : Tester plusieurs échanges
- [ ] **Étapes** :
  1. Poser une question
  2. Écouter la réponse
  3. Poser une question de suivi
- [ ] **Résultat attendu** : Contexte maintenu, réponses cohérentes

### Tests de Robustesse

#### Test 8 : Gestion des Erreurs
- [ ] **Objectif** : Tester la gestion d'erreurs
- [ ] **Étapes** :
  1. Couper la connexion Internet
  2. Essayer d'interagir
  3. Rétablir la connexion
- [ ] **Résultat attendu** : Messages d'erreur clairs, reconnexion automatique

#### Test 9 : Performance Audio
- [ ] **Objectif** : Valider la qualité audio
- [ ] **Étapes** :
  1. Tester avec différents niveaux de volume
  2. Parler à différentes distances du micro
  3. Tester avec du bruit ambiant
- [ ] **Résultat attendu** : Audio clair, pas de distorsion

#### Test 10 : Changement de Compagnon
- [ ] **Objectif** : Tester la transition entre compagnons
- [ ] **Étapes** :
  1. Commencer une conversation avec un compagnon
  2. Changer de compagnon en cours de session
  3. Continuer la conversation
- [ ] **Résultat attendu** : Transition fluide, nouveau contexte

---

## 🔧 Tests Techniques

### Vérification du Code
```bash
# Vérifier la syntaxe TypeScript
npm run type-check

# Lancer les tests unitaires (si disponibles)
npm test

# Vérifier le build de production
npm run build
```

### Tests de Performance
```bash
# Analyser le bundle
npm run build
npm run preview

# Ouvrir les DevTools et vérifier :
# - Temps de chargement initial
# - Utilisation mémoire
# - Performance audio
```

### Tests Cross-Browser
- [ ] **Chrome** : Fonctionnalité complète
- [ ] **Firefox** : Compatibilité WebRTC
- [ ] **Safari** : Permissions microphone
- [ ] **Edge** : Performance générale

---

## 🐛 Résolution de Problèmes

### Problèmes Courants

#### Erreur : "Microphone non accessible"
**Solution :**
1. Vérifier les permissions du navigateur
2. Autoriser l'accès au microphone pour le site
3. Redémarrer le navigateur si nécessaire

#### Erreur : "Clé API invalide"
**Solution :**
1. Vérifier la clé dans le fichier `.env`
2. Confirmer que la clé est active sur Google AI Studio
3. Redémarrer le serveur de développement

#### Erreur : "Connexion échouée"
**Solution :**
1. Vérifier la connexion Internet
2. Contrôler les quotas API sur Google AI Studio
3. Vérifier les logs de la console navigateur

#### Performance Audio Dégradée
**Solution :**
1. Fermer les autres applications audio
2. Vérifier la qualité du microphone
3. Tester avec un casque/écouteurs

### Logs de Débogage
```javascript
// Activer les logs détaillés dans la console
localStorage.setItem('debug', 'true');

// Vérifier l'état de l'application
console.log(window.__APP_STATE__);
```

---

## 📊 Métriques de Test

### Critères de Réussite
- [ ] **Temps de chargement** : < 3 secondes
- [ ] **Latence audio** : < 500ms
- [ ] **Taux de réussite API** : > 95%
- [ ] **Qualité audio** : Claire et sans distorsion
- [ ] **Stabilité** : Pas de crash sur 30 minutes d'utilisation

### Environnements de Test
- **Développement** : `npm run dev`
- **Production** : `npm run build && npm run preview`
- **Mobile** : Tests sur appareils iOS/Android
- **Réseau lent** : Simulation 3G/4G

---

## 🚀 Déploiement et Tests de Production

### Build de Production
```bash
# Créer le build optimisé
npm run build

# Tester le build localement
npm run preview

# Vérifier la taille du bundle
ls -la dist/
```

### Tests Post-Déploiement
1. **Fonctionnalité complète** sur l'URL de production
2. **Performance** avec outils comme Lighthouse
3. **Sécurité** des clés API et données
4. **Monitoring** des erreurs et performances

---

*Guide créé par Geoffroy Streit - Dernière mise à jour : Janvier 2025*