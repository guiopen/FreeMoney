const express = require('express');
const router = express.Router();

router.get('/nomes', (req, res) => {
  const nomes = ["Guilherme", "Olavo", "Marina", "Alexandre", "Jilliard"];
  res.json(nomes);
});

// Simulando um banco de dados em memória
let users = [];
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  console.log("/REGISTER CHAMADO", email, password)
  // Validação básica (ajuste conforme necessário)
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Verificar se o email já está cadastrado
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  // Criar novo usuário
  const newUser = { email, password };
  users.push(newUser);

  // Retornar sucesso (opcionalmente, retornar dados do novo usuário)
  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

module.exports = router;