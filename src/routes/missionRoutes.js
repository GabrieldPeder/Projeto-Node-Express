const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

// Rota POST para criar uma nova missão
router.post('/', missionController.createMission);

// Rotas GET para obter missões
router.get('/', missionController.getMissions);
router.get('/:id', missionController.getMissionById);

// NOVA ROTA: Atualizar uma missão existente por ID
router.put('/:id', missionController.updateMission);

module.exports = router;