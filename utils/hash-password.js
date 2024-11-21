const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const hashPassword = async (password) => {
  const salt = 10;
  password = password + process.env.HASH_CODE;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = hashPassword;