
# À Propos de Mon cercle de compagnons IA

## Concept

Mon cercle de compagnons IA est plus qu'une simple application de chatbot. C'est une vitrine technologique conçue pour démontrer les capacités de l'API Gemini Live dans la création d'expériences conversationnelles immersives et en temps réel. Le projet met l'accent sur la faible latence et l'interaction naturelle, simulant une conversation fluide et dynamique avec un personnage doté d'une personnalité unique.

L'idée centrale est de permettre aux utilisateurs non seulement de parler à une IA, mais aussi de la façonner, en lui donnant une identité, un ton et une apparence, rendant chaque interaction unique.

## Objectif du Projet

Ce projet a été développé avec les objectifs suivants :

1.  **Démonstration Pratique** : Fournir un exemple concret et fonctionnel de l'intégration de l'API Gemini Live dans une application web front-end.
2.  **Code de Référence** : Servir de base de code claire et bien structurée pour les développeurs souhaitant utiliser l'API dans leurs propres projets.
3.  **Mise en avant des Bonnes Pratiques** : Illustrer des approches efficaces pour la gestion du streaming audio (entrée et sortie), la gestion de l'état de la connexion et l'interaction dynamique avec le modèle Gemini.
4.  **Inspiration** : Montrer le potentiel créatif de l'IA conversationnelle au-delà des interfaces textuelles traditionnelles.

## Technologies Clés

L'application repose sur un ensemble de technologies modernes et efficaces, choisies pour leur simplicité et leur performance.

-   **API Gemini Live (`@google/genai`)** : Le cœur de l'application. Elle gère la connexion WebSocket, le streaming audio bidirectionnel et la communication avec le modèle `gemini-2.5-flash-preview-native-audio-dialog`, optimisé pour des dialogues audio naturels.

-   **React** : Utilisé pour construire une interface utilisateur réactive et modulaire. L'approche par composants facilite la gestion de la complexité de l'interface.

-   **Zustand** : Une bibliothèque de gestion d'état minimaliste pour React. Elle est utilisée ici pour partager de manière centralisée les informations sur l'utilisateur, l'agent sélectionné et l'état de l'interface (par exemple, la visibilité des modales).

-   **Web Audio API & AudioWorklets** : Pour un contrôle de bas niveau sur le traitement audio.
    -   Un `AudioWorklet` est utilisé pour capturer l'audio du microphone, le convertir au format PCM16 et l'envoyer au serveur.
    -   Un autre `AudioWorklet` analyse le volume de l'audio reçu de l'API, permettant d'animer le visage de l'agent en temps réel lorsqu'il parle.

-   **ES Modules & `importmap`** : L'application évite délibérément une étape de compilation complexe (comme Webpack ou Rollup). L'`importmap` dans `index.html` permet au navigateur d'importer directement des modules depuis un CDN (esm.sh), ce qui simplifie grandement le développement et le déploiement de cette démo.