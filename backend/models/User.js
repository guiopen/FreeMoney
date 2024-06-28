const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: String,
  dataNascimento: Date,
  email: String,
  senha: String,
  amigos: [{
    nome: String,
    email: String
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
