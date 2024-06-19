const express = require('express');
const router = express.Router();

// rota exemplo com os nomes dos integrantes do grupo
router.get('/nomes', (req, res) => {
  const nomes = ["Guilherme", "Olavo", "Marina", "Alexandre", "Jilliard"];
  res.json(nomes);
});

// Simulando um banco de dados em memória
let users = [];
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  // Verificar se o email já está cadastrado
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const newUser = { email, password };
  users.push(newUser);

  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

module.exports = router;