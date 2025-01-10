// Question: Comment organiser le point d'entrée de l'application ?
/**
 * Créer un fichier principal (e.g., server.js, index.js ou app.js) qui configure l'application.
 * Décomposer les responsabilités :
*     Configurations : placer dans un fichier séparé (./config/env.js, ./config/db.js).
*     Routes : utiliser des fichiers spécifiques dans un dossier routes/.
*     Middlewares : regrouper dans un dossier middlewares/.
*     Initialisation de la base de données : dans un fichier spécifique, e.g., db.js.
 * 
 * 
 


*/
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

/**Utiliser une fonction asynchrone pour gérer l'initialisation :

    Démarrer les connexions à la base de données.
    Gérer les erreurs propres à chaque étape.

Gérer l'arrêt proprement :
  Écouter les signaux du système (e.g., SIGTERM, SIGINT).
  Fermer les connexions à la base de données avant de quitter.
 * 
 * 
 *
*/

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    // TODO: Configurer les middlewares Express
    // TODO: Monter les routes
    // TODO: Démarrer le serveur
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
});

startServer();