const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Importa as rotas do arquivo routes.js
const router = require('./routes'); 
app.use('/', router); // Monta as rotas na raiz '/'

// Adiciona essa linha para redirecionar todas as requisições para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
