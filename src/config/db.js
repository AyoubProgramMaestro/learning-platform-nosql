// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Un module séparé pour les connexions permet de centraliser la gestion des connexions, de simplifier la maintenance, et d'éviter les duplications de code. Il améliore également la réutilisabilité et la lisibilité.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour fermer proprement les connexions, il est important d'utiliser des méthodes comme close() pour MongoDB et quit() pour Redis, et de s'assurer que les connexions sont fermées lors de la fermeture de l'application pour éviter les fuites de ressourc

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

async function closeMongo() {
  if (mongoClient) {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  } else {
    console.log('No active MongoDB connection found');
  }
}

async function closeRedis() {
  if (redisClient) {
    await redisClient.quit();
    console.log('Redis connection closed');
  } else {
    console.log('No active Redis connection found');
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  closeMongo,  
  closeRedis, 
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