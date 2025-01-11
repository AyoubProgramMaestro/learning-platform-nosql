// Question: Pourquoi créer des services séparés ?
// Réponse: Les services séparés améliorent l'organisation, la réutilisabilité et la maintenabilité du code, facilitent les tests et permettent une meilleure gestion des erreurs.

const { ObjectId } = require('mongodb');
const db = require('../config/db');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    // Utilisation de l'instance MongoDB obtenue via db.getDbInstance()
    const collectionObj = db.getDbInstance().collection(collection);
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
    const collection = db.getDbInstance().collection('courses');
    const stats = await collection.aggregate([
      { $group: { _id: null, totalCourses: { $sum: 1 } } }
    ]).toArray();
    
    // Retourner les statistiques ou une valeur par défaut
    return stats[0] || { totalCourses: 0 };
  } catch (error) {
    console.error('Error getting course stats:', error);
    throw new Error('Unable to get course stats');
  }
}


// Fonction pour créer un cours dans la base de données
async function createCourse(courseData) {
  try {
    const collection = db.getDbInstance().collection('courses');
    const result = await collection.insertOne(courseData);

    if (result && result.insertedId) {
      return { id: result.insertedId, ...courseData }; // Renvoi de l'objet créé avec l'ID
    } else {
      throw new Error('Failed to insert course into database');
    }
  } catch (error) {
    console.error('Error creating course:', error);
    throw new Error('Failed to create course in database');
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  getCourseById,
  getCourseStats,
  createCourse
};