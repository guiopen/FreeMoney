require("dotenv").config();
const express = require('express');
const { MongoClient } = require('mongodb');
const { generateRandomNumber } = require('./utils/generateRandomCode');
const { encryptPassword, verifyPassword } = require('./utils/passwordEncryption');
const { checkToken } = require('./utils/checkToken');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

// Configuração da URL de conexão do MongoDB
const mongoURL = process.env.MONGO_URL
const dbName = "freeMoneyDb";
let database;

// Conecta ao banco de dados MongoDB
MongoClient.connect(mongoURL, { useUnifiedTopology: true })
  .then(client => {
    console.log("Conectado ao MongoDB");
    database = client.db(dbName);
  })
  .catch(error => console.error(error));


// Rota para buscar nomes - apenas para testes
router.get('/nomes', (req, res) => {
  const nomes = ["Guilherme", "Olavo", "Marina", "Alexandre", "Jilliard"];
  res.json(nomes);
});

// Rota para registrar um novo usuário
router.post('/register_user', async (req, res) => {
  const { name, email, password } = req.body;

  // Validação básica dos campos
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
      history: []
    };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota para adicionar uma nova transação (protegida por token)
router.post('/add_transaction', checkToken, async (req, res) => {
  const { title, date, category, value, expense } = req.body;
  const userId = req.user.id;

  // Validação básica dos campos
  if (!title || !date || !category || !value || expense === undefined) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const usersCollection = database.collection('users');

    // Busca o usuário para obter seu histórico atual e determinar o novo ID
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Calcula o novo ID da transação (último ID + 1)
    const newId = user.history.length > 0 
      ? user.history[user.history.length - 1].id + 1 
      : 0;

    // Cria o objeto da nova transação
    const newTransaction = {
      id: newId,
      title,
      date,
      category,
      value,
      expense,
    };

    // Atualiza o histórico do usuário no banco de dados
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { history: newTransaction } } 
    );

    if (result.modifiedCount === 1) {
      res.status(201).json({ message: 'Transação adicionada com sucesso', transaction: newTransaction });
    } else {
      res.status(500).json({ message: 'Erro ao adicionar transação' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar transação' });
  }
});

// Rota para buscar os dados do usuário logado (protegida por token)
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

  // Validação básica dos campos
  if (!email || !password) {
      return res.status(422).json({ message: "Email e senha são obrigatórios!" });
  }

  // Verifica se o email já está cadastrado
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
      // Define o tempo máximo de sessão para 3 horas
      const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '3h' });
      res.status(200).json({ token, message: "Autenticação realizada com sucesso!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
  }
});



// Rota privada de teste (protegida por token)
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

  // Validação básica dos campos
  if (!email || !code) {
    return res.status(400).json({ message: 'Email e código são obrigatórios' });
  }

  try {
    const usersCollection = database.collection('users');

    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    // Verifica se o código fornecido está correto
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
