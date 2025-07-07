const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

// ADICIONE ESTE CONSOLE.LOG
console.log('missionRoutes.js: missionController carregado:', missionController);
// ADICIONE ESTE CONSOLE.LOG
console.log('missionRoutes.js: Registrando POST /');

router.post('/', missionController.createMission);

module.exports = router;