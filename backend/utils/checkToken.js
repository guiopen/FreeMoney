const jwt = require("jsonwebtoken");
require("dotenv").config();


function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Acesso negado!" });

    try {
      const secret = process.env.SECRET;

      const decoded = jwt.verify(token, secret);
      req.user = decoded

      next();
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" });
    }
  }

module.exports = { checkToken }