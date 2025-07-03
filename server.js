// Importa o módulo express
const express = require('express');
// Cria uma instância do aplicativo express
const app = express();
// Define a porta em que o servidor irá escutar
const PORT = 3000;

// Define uma rota básica para a raiz do servidor
app.get('/', (req, res) => {
  res.send('Olá, mundo! Servidor Express está funcionando!');
});

// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});