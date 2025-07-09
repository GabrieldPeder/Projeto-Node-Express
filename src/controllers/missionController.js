const missionModel = require('../models/missionModel');

// Função controladora para criar uma nova missão
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

// Função controladora para obter todas as missões
const getMissions = (req, res) => {
  missionModel.getMissions((err, missions) => {
    if (err) {
      console.error('Erro no controller ao obter todas as missões:', err.message);
      return res.status(500).json({ message: 'Erro interno do servidor ao obter missões.' });
    }
    res.status(200).json(missions);
  });
};

// Função controladora para obter uma missão por ID
const getMissionById = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID da missão inválido. Deve ser um número.' });
  }

  missionModel.getMissionById(id, (err, mission) => {
    if (err) {
      console.error('Erro no controller ao obter missão por ID:', err.message);
      return res.status(500).json({ message: 'Erro interno do servidor ao obter missão.' });
    }
    if (!mission) {
      return res.status(404).json({ message: 'Missão não encontrada.' });
    }
    res.status(200).json(mission);
  });
};

// Função controladora para atualizar uma missão
const updateMission = (req, res) => {
  const { id } = req.params;
  const updatedMissionData = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID da missão inválido. Deve ser um número.' });
  }

  if (Object.keys(updatedMissionData).length === 0) {
    return res.status(400).json({ message: 'Corpo da requisição vazio. Forneça dados para atualização.' });
  }

  missionModel.updateMission(id, updatedMissionData, (err, result) => {
    if (err) {
      console.error('Erro no controller ao atualizar missão:', err.message);
      return res.status(500).json({ message: 'Erro interno do servidor ao atualizar missão.' });
    }
    if (result === null) {
      return res.status(404).json({ message: 'Missão não encontrada para atualização.' });
    }
    res.status(200).json({ message: 'Missão atualizada com sucesso.', mission: result });
  });
};

// Função controladora para excluir uma missão
const deleteMission = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID da missão inválido. Deve ser um número.' });
  }

  missionModel.deleteMission(id, (err, result) => {
    if (err) {
      console.error('Erro no controller ao excluir missão:', err.message);
      return res.status(500).json({ message: 'Erro interno do servidor ao excluir missão.' });
    }
    if (result === null) {
      return res.status(404).json({ message: 'Missão não encontrada para exclusão.' });
    }
    res.status(204).send();
  });
};

// Exporta todas as funções
module.exports = {
  createMission,
  getMissions,
  getMissionById,
  updateMission,
  deleteMission, // Garanta que deleteMission está aqui!
};