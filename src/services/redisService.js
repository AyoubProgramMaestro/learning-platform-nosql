// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Utilisez des expirations (EXPIRE) pour limiter la durée de vie des clés, appliquez des stratégies LRU ou LFU pour l'éviction, et assurez une cohérence entre le cache et les données sources. Utilisez des préfixes pour les clés et sécurisez l'accès à Redis.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utilisez des noms de clés lisibles et structurés, ajoutez des préfixes pour l'organisation, définissez des expirations appropriées, et privilégiez des structures de données adaptées à vos besoins. Limitez la longueur des clés pour une gestion optimale.

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