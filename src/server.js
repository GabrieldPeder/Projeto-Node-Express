const express = require('express');
const app = express();
const PORT = 3000;

// Importa a conexão com o banco de dados

const db = require('./database/db');

// Importa as rotas de missões

const missionRoutes = require('./routes/missionRoutes'); 

// Middleware para processar requisições JSON
app.use(express.json());

// Middleware para montar as rotas de missões
app.use('/missions', missionRoutes);

// Define uma rota básica para a raiz do servidor (pode manter ou remover)
app.get('/', (req, res) => {
  res.send('Olá, mundo! Servidor Express está funcionando!');
});

// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});