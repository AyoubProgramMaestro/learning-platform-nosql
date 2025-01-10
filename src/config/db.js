// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    mongoClient = new MongoClient(config.mongodb.uri);

    await mongoClient.connect(); // Connexion à MongoDB
    db = mongoClient.db(config.mongodb.dbName); // Sélection de la base de données
    console.log(`Connected to MongoDB: ${config.mongodb.dbName}`);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Quitter l'application en cas d'erreur critique
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  return new Promise((resolve, reject) => {
    redisClient = redis.createClient({ url: config.redis.uri });

    redisClient.on('error', (err) => {
      console.error('Error connecting to Redis:', err.message);
      reject(err);
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
      resolve(redisClient);
    });

    redisClient.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err.message);
      process.exit(1); // Quitter l'application si Redis échoue
    });
  });
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getDbInstance: () => {
    if (!db) {
      throw new Error('MongoDB is not connected. Call connectMongo first.');
    }
    return db;
  },
  getRedisClient: () => {
    if (!redisClient) {
      throw new Error('Redis is not connected. Call connectRedis first.');
    }
    return redisClient;
  },
};