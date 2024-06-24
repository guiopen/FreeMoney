const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

// Configuração da URL de conexão do MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'freeMoneyDb';
let db;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("Conectado ao MongoDB");
    db = client.db(dbName);
  })
  .catch(error => console.error(error));

// rota exemplo com os nomes dos integrantes do grupo
router.get('/nomes', (req, res) => {
  const nomes = ["Guilherme", "Olavo", "Marina", "Alexandre", "Jilliard"];
  res.json(nomes);
});

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const usersCollection = db.collection('users');

    // Verificar se o email já está cadastrado
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const newUser = { email, password };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

module.exports = router;