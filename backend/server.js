const express = require('express');
const cors = require('cors');
const app = express();

// Permitir todos os origens por enquanto (*), ajuste conforme necessário
app.use(cors());

// Rotas da sua aplicação
app.put('/api/user', (req, res) => {
  // Lógica para atualizar usuário
  res.send('Usuário atualizado com sucesso');
});

// Outras rotas...

// Porta que o servidor irá escutar
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
