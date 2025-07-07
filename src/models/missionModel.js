const db = require('../database/db');

// **DEFINIÇÃO DA FUNÇÃO CREATE MISSION (COLOQUE ESTA DE VOLTA!)**
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

// **DEFINIÇÃO DA FUNÇÃO GET MISSIONS (COLOQUE ESTA DE VOLTA!)**
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

// **DEFINIÇÃO DA FUNÇÃO GET MISSION BY ID (COLOQUE ESTA DE VOLTA!)**
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

// DEFINIÇÃO DA FUNÇÃO UPDATE MISSION (esta você já adicionou)
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

// Garanta que todas as funções estão sendo exportadas
module.exports = {
  createMission,
  getMissions,
  getMissionById,
  updateMission,
};