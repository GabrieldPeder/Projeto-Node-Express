const db = require('../database/db');

// Função para criar uma nova missão no banco de dados (já existe)
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

//Obter todas as missões
const getMissions = (callback) => {
  const sql = `SELECT * FROM missions`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao obter todas as missões no modelo:', err.message);
      return callback(err);
    }
    callback(null, rows); // Retorna todas as linhas encontradas
  });
};

//Obter uma missão por ID
const getMissionById = (id, callback) => {
  const sql = `SELECT * FROM missions WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Erro ao obter missão por ID no modelo:', err.message);
      return callback(err);
    }
    callback(null, row); // Retorna a linha encontrada (ou undefined se não encontrar)
  });
};

module.exports = {
  createMission,
  getMissions,      
  getMissionById,   
};