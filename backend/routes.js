require("dotenv").config();
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

// Simulando um banco de dados em memória
const users = [];

// Rota para registrar um novo usuário
router.post('/register', (req, res) => {
  const { id, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  // Verificar se o email já está cadastrado
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const newUser = { id, email, password };
  users.push(newUser);

  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// Rota para realizar o login e gerar o token JWT
router.post("/login", (req, res) => {
  const { email, password } = req.body;

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
