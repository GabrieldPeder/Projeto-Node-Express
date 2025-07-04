const express = require('express');
const app = express();
const PORT = 3000;

// Importa a conexão com o banco de dados (isso fará com que o script db.js seja executado)
const db = require('./src/database/db'); // Adicione esta linha

// Define uma rota básica para a raiz do servidor
app.get('/', (req, res) => {
  res.send('Olá, mundo! Servidor Express está funcionando!');
});

// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});