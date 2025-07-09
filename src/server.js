const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path'); // Necessário para resolver caminhos de arquivos

const db = require('./database/db'); // Importa a conexão com o banco de dados
const missionRoutes = require('./routes/missionRoutes'); // Importa as rotas de missões

app.use(express.json()); // Middleware para processar requisições JSON

// Middleware para servir arquivos estáticos da pasta 'frontend'
// Isso permite que o navegador acesse index.html, style.css, script.js, etc.
app.use(express.static(path.join(__dirname, 'frontend')));

// Middleware para montar as rotas da API de missões
app.use('/missions', missionRoutes);

// Rota principal para servir o index.html quando alguém acessar a raiz do servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});