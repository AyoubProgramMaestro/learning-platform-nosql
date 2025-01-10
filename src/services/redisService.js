// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URI });

client.on('error', (err) => {
  console.log('Redis Client Error', err);
});

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl = 3600) {
    // TODO: Implémenter une fonction générique de cache
    return new Promise((resolve, reject) => {
      client.setex(key, ttl, JSON.stringify(data), (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });  
}
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData
  };