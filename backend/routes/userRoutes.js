const express = require('express');
const router = express.Router();
const { checkToken } = require('../utils/checkToken');
const { encryptPassword } = require('../utils/passwordEncryption');
const { MongoClient } = require('mongodb');

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

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
  }

  try {
    const usersCollection = database.collection('users');
    const existingUser = await usersCollection.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await encryptPassword(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      history: [] // Inicializa com um histórico vazio
    };

    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota para atualizar as informações do usuário
router.put('/user/:id', checkToken, async (req, res) => {
  const usersCollection = database.collection('users');
  const { id } = req.params;
  const { name, dataNascimento, email, password } = req.body;

  try {
    const ObjectId = require('mongodb').ObjectId;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido!" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (dataNascimento) updateData.dataNascimento = dataNascimento;
    if (email) updateData.email = email;
    if (password) updateData.password = await encryptPassword(password);

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ msg: "Informações atualizadas com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao atualizar informações do usuário" });
  }
});

module.exports = router;
