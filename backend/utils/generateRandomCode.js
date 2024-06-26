
// gera um numero aleatorio de 0 a 9999
const generateRandomNumber = () => {
    const numero = Math.floor(Math.random() * 10000);
    return numero.toString().padStart(4, '0');
}

module.exports = { generateRandomNumber };
