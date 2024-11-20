const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true, 
});

const connectDB = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting:', err.message);
      process.exit(1);
    } else {
      console.log('Connected to the database.');
      connection.release();
    }
  });
};

module.exports = { connectDB, pool };