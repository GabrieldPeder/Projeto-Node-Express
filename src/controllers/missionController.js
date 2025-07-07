const missionModel = require('../models/missionModel');

// Função controladora para criar uma nova missão (já existe)
const createMission = (req, res) => {
  const newMission = req.body;

  if (!newMission.name || !newMission.crew || !newMission.spacecraft || !newMission.destination || !newMission.status || !newMission.duration) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios para criar uma missão.' });
  }

  missionModel.createMission(newMission, (err, result) => {
    if (err) {
      console.error('Erro no controller ao chamar model (createMission):', err.message);
      return res.status(500).json({ message: 'Erro interno do servidor ao criar missão.' });
    }
    res.status(201).json(result);
  });
};

//Obter todas as missões
const getMissions = (req, res) => {
  missionModel.getMissions((err, missions) => {
    if (err) {
      console.error('Erro no controller ao obter todas as missões:', err.message);
      return res.status(500).json({ message: 'Erro interno do servidor ao obter missões.' });
    }
    res.status(200).json(missions); // Retorna o array de missões com status 200 OK
  });
};

//Obter uma missão por ID
const getMissionById = (req, res) => {
  const { id } = req.params; // Pega o ID da URL (ex: /missions/123)

  // Validação básica: garante que o ID é um número
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID da missão inválido. Deve ser um número.' });
  }

  missionModel.getMissionById(id, (err, mission) => {
    if (err) {
      console.error('Erro no controller ao obter missão por ID:', err.message);
      return res.status(500).json({ message: 'Erro interno do servidor ao obter missão.' });
    }
    if (!mission) {
      return res.status(404).json({ message: 'Missão não encontrada.' }); // Status 404 Not Found se não houver missão com o ID
    }
    res.status(200).json(mission); // Retorna a missão encontrada com status 200 OK
  });
};

module.exports = {
  createMission,
  getMissions,      
  getMissionById,   
};