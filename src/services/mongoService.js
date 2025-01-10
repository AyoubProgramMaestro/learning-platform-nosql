// Question: Pourquoi créer des services séparés ?
// Réponse: Les services séparés améliorent l'organisation, la réutilisabilité et la maintenabilité du code, facilitent les tests et permettent une meilleure gestion des erreurs.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    const collectionObj = db.mongodb.db.collection(collection);
    const result = await collectionObj.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error(`Error finding document by ID: ${id}`, error);
    throw new Error('Unable to find document');
  }
}

// Fonction pour récupérer un cours par son ID
async function getCourseById(courseId) {
  return await findOneById('courses', courseId);
}

// Fonction pour récupérer les statistiques des cours
async function getCourseStats() {
  try {
    const collection = db.mongodb.db.collection('courses');
    const stats = await collection.aggregate([
      { $group: { _id: null, totalCourses: { $sum: 1 } } }
    ]).toArray();
    return stats[0] || { totalCourses: 0 };
  } catch (error) {
    console.error('Error getting course stats', error);
    throw new Error('Unable to get course stats');
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  getCourseById,
  getCourseStats
};