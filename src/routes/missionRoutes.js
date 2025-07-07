const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

// Rota POST para criar uma nova missão (já existe)
router.post('/', missionController.createMission);

// NOVA ROTA: Obter todas as missões
router.get('/', missionController.getMissions);

// NOVA ROTA: Obter uma missão específica por ID
router.get('/:id', missionController.getMissionById);

module.exports = router;