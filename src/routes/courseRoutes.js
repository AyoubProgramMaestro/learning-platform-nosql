// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : our améliorer la lisibilité, faciliter la maintenance, et éviter la surcharge d'un fichier unique en séparant les responsabilités par fonctionnalité ou module.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: En regroupant les routes par domaine fonctionnel ou ressource (exemple : users, courses), en utilisant un fichier principal pour les monter et en respectant une structure hiérarchique claire.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');


// Routes pour les cours
router.get('/stats', courseController.getCourseStats);
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);


module.exports = router;