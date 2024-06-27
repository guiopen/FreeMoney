require("dotenv").config();
const express = require('express');
const { MongoClient } = require('mongodb');
const { generateRandomNumber } = require('./utils/generateRandomCode');
const { encryptPassword, verifyPassword } = require('./utils/passwordEncryption');
const { checkToken } = require('./utils/checkToken');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

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
router.post('/register', (req, res) => {
  const { id, email, password } = req.body;

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

  const newUser = { id, email, password };
  users.push(newUser);

  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// Rota para realizar o login e gerar o token JWT
router.post("/login_user", async (req, res) => {
  const usersCollection = database.collection('users');
  const { email, password } = req.body;

  // validações
  if (!email || !password) {
    return res.status(422).json({ msg: "Email e senha são obrigatórios!" });
  }

  // checando se o usuário existe
  const user = await usersCollection.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // checando se a senha bate
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: error });
  }
});

// Rota privada de teste
router.get("/user/:id", checkToken, async (req, res) => {
  const usersCollection = database.collection('users');
  const id = req.params.id;

  try {
    // Verifica se o ID é válido
    const ObjectId = require('mongodb').ObjectId;
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

  // validações
  if (!email || !password) {
    return res.status(422).json({ msg: "Email e senha são obrigatórios!" });
  }

  // checando se o usuário existe no "banco de dados" em memória
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // checando se a senha corresponde
  if (user.password !== password) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;

    if (!secret) {
      console.log("Chave secreta não configurada");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email 
      },
      secret
    );

    res.status(200).json({ message: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Erro ao autenticar usuário!" });
  }
});

// verificar o token JWT
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Acesso negado! Token não fornecido." });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ message: "Token inválido!" });
  }
}

// Rota privada para obter informações do usuário por ID
router.get("/user/:id", checkToken, (req, res) => {
  const id = req.params.id;

  // Checando se o usuário existe 
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // Não enviamos a senha do usuário na resposta
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;

  res.status(200).json({ user: userWithoutPassword });
});

module.exports = router;
