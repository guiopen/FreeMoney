const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json()); 
app.use(express.static('../frontend/build'));

// Importa as rotas do arquivo routes.js
const router = require('./routes'); 
app.use('/', router); // Monta as rotas na raiz '/'

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});