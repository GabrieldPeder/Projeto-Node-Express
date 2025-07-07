const db = require('../database/db');

// ADICIONE ESTE CONSOLE.LOG
console.log('missionModel.js: db carregado:', db);

const createMission = (mission, callback) => {
  // ADICIONE ESTE CONSOLE.LOG
  console.log('missionModel.js: createMission executado. Missão:', mission);
  const { name, crew, spacecraft, destination, status, duration } = mission;

  const sql = `
    INSERT INTO missions (name, crew, spacecraft, destination, status, duration)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, crew, spacecraft, destination, status, duration], function(err) {
    if (err) {
      console.error('Erro no model ao executar SQL:', err.message); // ADICIONE ESTE CONSOLE.ERROR
      return callback(err);
    }
    callback(null, { id: this.lastID, ...mission });
  });
};

module.exports = {
  createMission,
};