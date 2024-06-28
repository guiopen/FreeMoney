const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware para verificar o token JWT
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado! Token não fornecido." });

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);

    req.userId = decoded.id; // Armazena o ID do usuário na requisição
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token inválido!" });
  }
}

module.exports = { checkToken };
