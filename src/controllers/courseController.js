// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const { name, description, duration } = req.body;

    // Validation des champs requis
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    // Création d'un cours dans MongoDB
    const newCourse = await mongoService.createCourse({ name, description, duration: duration || 0 });

    // Mise à jour du cache Redis (si applicable)
    if (redisService && redisService.updateCourseCache) {
      await redisService.updateCourseCache(newCourse);
    }

    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse,
    });
  } catch (error) {
    console.error('Error creating course:', error.message);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const course = await mongoService.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching course', error });
  }
}

async function getCourseStats(req, res) {
  try {
    
    const stats = await mongoService.getCourseStats();

    
    if (!stats) {
      return res.status(404).json({ message: 'No stats found' });
    }

   
    res.status(200).json({ stats });
  } catch (error) {
    console.error('Error fetching course statistics:', error);
    res.status(500).json({ message: 'Error fetching course statistics', error: error.message });
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats
};