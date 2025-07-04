const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define o caminho para o arquivo do banco de dados
// Ele será criado na raiz do seu projeto (onde está o package.json)
const DB_PATH = path.resolve(__dirname, '..', '..', 'database.sqlite');

// Cria e abre a conexão com o banco de dados
// Se o arquivo do banco de dados não existir, ele será criado
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});
    db.run(`
      CREATE TABLE IF NOT EXISTS missions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        crew TEXT NOT NULL,
        spacecraft TEXT NOT NULL,
        destination TEXT NOT NULL,
        status TEXT NOT NULL,
        duration INTEGER NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela missions:', err.message);
      } else {
        console.log('Tabela missions verificada/criada.');
        // Opcional: Inserir dados de exemplo na primeira vez que a tabela for criada
        // Verificamos se a tabela está vazia antes de inserir
        db.get("SELECT COUNT(*) AS count FROM missions", (err, row) => {
          if (err) {
            console.error('Erro ao verificar missões existentes:', err.message);
          } else if (row.count === 0) {
            console.log('Inserindo dados de exemplo na tabela missions...');
            const insert = db.prepare(`
              INSERT INTO missions (name, crew, spacecraft, destination, status, duration)
              VALUES (?, ?, ?, ?, ?, ?)
            `);
            insert.run('Apollo 11', 'Neil Armstrong, Buzz Aldrin, Michael Collins', 'Apollo CSM', 'Lua', 'Concluída', 195);
            insert.run('Mars Perseverance', 'N/A (Robô)', 'Perseverance Rover', 'Marte', 'Ativa', 1400);
            insert.finalize();
            console.log('Dados de exemplo inseridos.');
          }
        });
      }
    });
    // --- Fim do script de inicialização da tabela ---

module.exports = db;