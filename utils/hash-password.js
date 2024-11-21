const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const hashPassword = async (password) => {
  const salt = process.env.HASH_CODE;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = hashPassword;