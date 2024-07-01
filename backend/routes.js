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

// Rota para atualizar os dados do usuário
router.put('/user', checkToken, async (req, res) => {
  // Obtém o ID do usuário a partir do token JWT decodificado (verificar middleware checkToken)
  const userId = req.user.id;

  // Extrai os dados enviados no corpo da requisição
  const { name, email, newPassword, currentPassword } = req.body;

  try {
    // Obtém a coleção 'users' do banco de dados
    const usersCollection = database.collection('users');

    // Busca o usuário no banco de dados pelo ID
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    // Se o usuário não for encontrado, retorna um erro 404 (Not Found)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha atual fornecida está correta
    const isPasswordValid = await verifyPassword(currentPassword, user.password);

    // Se a senha atual estiver incorreta, retorna um erro 401 (Unauthorized)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }

    // Cria um objeto para armazenar os campos a serem atualizados
    const updateFields = {};

    // Verifica se um novo nome foi fornecido e adiciona ao objeto de atualização
    if (name) {
      updateFields.name = name;
    }

    // Verifica se um novo email foi fornecido e adiciona ao objeto de atualização
    if (email) {
      updateFields.email = email;
    }

    // Verifica se uma nova senha foi fornecida e adiciona ao objeto de atualização
    if (newPassword) {
      // Criptografa a nova senha
      const hashedNewPassword = await encryptPassword(newPassword);
      updateFields.password = hashedNewPassword;
    }

    // Se houver campos a serem atualizados
    if (Object.keys(updateFields).length > 0) {
      // Atualiza os dados do usuário no banco de dados
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateFields }
      );
    }

    // Retorna uma resposta de sucesso (200 OK) com uma mensagem
    res.status(200).json({ message: 'Dados do usuário atualizados com sucesso' });
  } catch (error) {
    // Em caso de erro, loga o erro no console
    console.error(error);

    // Retorna uma resposta de erro interno do servidor (500 Internal Server Error)
    res.status(500).json({ message: 'Erro ao atualizar dados do usuário' });
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