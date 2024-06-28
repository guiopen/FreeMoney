const bcrypt = require('bcrypt');

// Função para criptografar a senha
async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Erro ao criptografar senha:', error);
    throw error; 
  }
}

// Função para verificar a senha
async function verifyPassword(password, hashedPassword) {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    throw error;
  }
}

module.exports = { encryptPassword, verifyPassword };
