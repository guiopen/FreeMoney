require("dotenv").config();
const express = require('express');
const { MongoClient } = require('mongodb');
const { generateRandomNumber } = require('./utils/generateRandomCode');
const { encryptPassword, verifyPassword } = require('./utils/passwordEncryption');
const { checkToken } = require('./utils/checkToken');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

const mongoURL = process.env.MONGO_URL;
const dbName = "freeMoneyDb";
let database;

MongoClient.connect(mongoURL, { useUnifiedTopology: true })
  .then(client => {
    console.log("Conectado ao MongoDB");
    database = client.db(dbName);
  })
  .catch(error => console.error(error));

router.get('/nomes', (req, res) => {
  const nomes = ["Guilherme", "Olavo", "Marina", "Alexandre", "Jiliard"];
  res.json(nomes);
});

const fakeTransactions = [
  {
    id: 0,
    title: "Conta de Luz",
    date: new Date(),
    category: "Casa",
    value: 789.2,
    expense: true,
  },
  {
    id: 4,
    title: "Estágio",
    date: new Date(),
    category: "Salário",
    value: 1789.2,
    expense: false,
  }
];

router.post('/register_user', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const usersCollection = database.collection('users');
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const userCode = generateRandomNumber();
    const hashedPassword = await encryptPassword(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      code: userCode,
      history: fakeTransactions,
    };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

router.get('/user', checkToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const usersCollection = database.collection('users');

    const user = await usersCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar dados do usuário' });
  }
});

// Rota para atualizar as informações do usuário
router.put("/edit_user/:id", checkToken, async (req, res) => {
  const usersCollection = database.collection('users');
  const id = req.user.id;

  try {
    const filter = { _id: new ObjectId(id) };
    const updateFields = {};

    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.email) {
      updateFields.email = req.body.email;
    }
    if (req.body.password) {
      const hashedPassword = await encryptPassword(req.body.password);
      updateFields.password = hashedPassword;
    }

    const updateResult = await usersCollection.updateOne(filter, { $set: updateFields });

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const updatedUser = await usersCollection.findOne(filter, { projection: { password: 0 } });
    res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar informações do usuário" });
  }
});


// Rota para realizar o login e gerar o token JWT
router.post("/login_user", async (req, res) => {
  const usersCollection = database.collection('users');
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Email e senha são obrigatórios!" });
  }

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ message: "Senha inválida" });
  }

  try {
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '3h' });
    res.status(200).json({ token, message: "Autenticação realizada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

router.get("/test/user/:id", checkToken, async (req, res) => {
  const usersCollection = database.collection('users');
  const id = req.params.id;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido!" });
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar usuário" });
  }
});

router.get('/friend_history', async (req, res) => {
  const { email, code } = req.query;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email e código são obrigatórios' });
  }

  try {
    const usersCollection = database.collection('users');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    if (user.code !== code) {
      return res.status(401).json({ message: 'Código inválido' });
    }

    res.status(200).json({ history: user.history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar histórico de transações' });
  }
});

module.exports = router;