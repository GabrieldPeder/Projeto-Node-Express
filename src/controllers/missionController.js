const missionModel = require('../models/missionModel');

// ADICIONE ESTE CONSOLE.LOG
console.log('missionController.js: missionModel carregado:', missionModel);

const createMission = (req, res) => {
  // ADICIONE ESTE CONSOLE.LOG
  console.log('missionController.js: createMission executado. Corpo da requisição:', req.body);

  const newMission = req.body;

  if (!newMission.name || !newMission.crew || !newMission.spacecraft || !newMission.destination || !newMission.status || !newMission.duration) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios para criar uma missão.' });
  }

  missionModel.createMission(newMission, (err, result) => {
    if (err) {
      console.error('Erro no controller ao chamar model:', err.message); // ADICIONE ESTE CONSOLE.ERROR
      return res.status(500).json({ message: 'Erro interno do servidor ao criar missão.' });
    }
    res.status(201).json(result);
  });
};

module.exports = {
  createMission,
};