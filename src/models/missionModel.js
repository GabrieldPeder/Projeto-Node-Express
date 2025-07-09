const db = require('../database/db');

// Função para criar uma nova missão no banco de dados
const createMission = (mission, callback) => {
  const { name, crew, spacecraft, destination, status, duration } = mission;

  const sql = `
    INSERT INTO missions (name, crew, spacecraft, destination, status, duration)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, crew, spacecraft, destination, status, duration], function(err) {
    if (err) {
      console.error('Erro ao criar missão no modelo:', err.message);
      return callback(err);
    }
    callback(null, { id: this.lastID, ...mission });
  });
};

// Função para obter todas as missões
const getMissions = (callback) => {
  const sql = `SELECT * FROM missions`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao obter todas as missões no modelo:', err.message);
      return callback(err);
    }
    callback(null, rows);
  });
};

// Função para obter uma missão por ID
const getMissionById = (id, callback) => {
  const sql = `SELECT * FROM missions WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Erro ao obter missão por ID no modelo:', err.message);
      return callback(err);
    }
    callback(null, row);
  });
};

// Função para atualizar uma missão existente
const updateMission = (id, mission, callback) => {
  const { name, crew, spacecraft, destination, status, duration } = mission;

  const sql = `
    UPDATE missions
    SET name = ?, crew = ?, spacecraft = ?, destination = ?, status = ?, duration = ?
    WHERE id = ?
  `;

  db.run(sql, [name, crew, spacecraft, destination, status, duration, id], function(err) {
    if (err) {
      console.error('Erro ao atualizar missão no modelo:', err.message);
      return callback(err);
    }
    if (this.changes === 0) {
      return callback(null, null);
    }
    callback(null, { id: id, ...mission });
  });
};

// Função para excluir uma missão
const deleteMission = (id, callback) => {
  const sql = `DELETE FROM missions WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Erro ao excluir missão no modelo:', err.message);
      return callback(err);
    }
    if (this.changes === 0) {
      return callback(null, null);
    }
    callback(null, id);
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