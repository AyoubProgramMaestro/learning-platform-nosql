// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : pour la Sécurité et stabilité, Prévention des erreurs d'exécution, Facilité de gestion
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : L'application peut échouer dès le démarrage, ce qui permet de corriger immédiatement la configuration.


const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI', 
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(
        `Missing required environment variable: ${varName}. ` +
        `Please ensure it is defined in your .env file.`
      );
    }
  });
  console.log('All required environment variables are set.');

}

validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};