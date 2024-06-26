const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

// Configuração da URL de conexão do MongoDB
const mongoURL = "mongodb+srv://free:money@freemoneycluster.fzca9rk.mongodb.net/?retryWrites=true&w=majority&appName=FreeMoneyCluster";
const dbName = "freeMoneyDb";
let database;

MongoClient.connect(mongoURL, { useUnifiedTopology: true })
  .then(client => {
    console.log("Conectado ao MongoDB");
    database = client.db(dbName);
  })
  .catch(error => console.error(error));

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
    const usersCollection = database.collection('users');

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