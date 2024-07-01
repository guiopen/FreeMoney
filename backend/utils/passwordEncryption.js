const bcrypt = require('bcryptjs');

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
