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
]
// Rota para registrar um novo usuário
router.post('/register_user', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const usersCollection = database.collection('users');

    // Verificar se o email já está cadastrado
    const existingUser = await usersCollection.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Cadastrar usuario
    const userCode = generateRandomNumber()
    const hashedPassword = await encryptPassword(password);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
      code: userCode,
      history: fakeTransactions
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
    // O ID do usuário está disponível em req.user após a verificação do token
    const userId = req.user.id; 

    const usersCollection = database.collection('users');

    // Busca o usuário pelo ID, excluindo o campo 'password' da resposta
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

// Rota para realizar o login e gerar o token JWT
router.post("/login_user", async (req, res) => {
  const usersCollection = database.collection('users');
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(422).json({ message: "Email e senha são obrigatórios!" });
  }

  // Verificar se o email já está cadastrado
  const user = await usersCollection.findOne({ email: email });
  if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  // Verifica se a senha bate
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida" });
  }

  try {
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      res.status(200).json({ token, message: "Autenticação realizada com sucesso!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
  }
});


// Rota privada de teste
router.get("/test/user/:id", checkToken, async (req, res) => {
  const usersCollection = database.collection('users');
  const id = req.params.id;

  try {
    // Verifica se o ID é válido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido!" });
    }

    // Busca o usuário pelo ID
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

// Rota para pegar o histórico de outro usuario
router.get('/friend_history', async (req, res) => {
  const { email, code } = req.query; // Obtém o email e o código da query string

  if (!email || !code) {
    return res.status(400).json({ message: 'Email e código são obrigatórios' });
  }

  try {
    const usersCollection = database.collection('users');

    const user = await usersCollection.findOne({ email: email });
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
