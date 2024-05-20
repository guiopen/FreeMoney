const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('../frontend/public'));

// Importa as rotas do arquivo routes.js
const router = require('./routes'); 
app.use('/', router); // Monta as rotas na raiz '/'

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});