const { pool } = require('./connectDB');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const hashPassword = require('../utils/hash-password');

dotenv.config();

const initDB = async () => {
  const dbName = process.env.DB_NAME;
  const createDBQuery = `CREATE DATABASE IF NOT EXISTS ${dbName}; USE ${dbName};`;
  const createTablesQuery = fs.readFileSync(path.join(__dirname, '.sql'), 'utf-8');

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(createDBQuery + createTablesQuery, async (error, results) => {
      if (error) throw error;

      const [rows] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [process.env.ADMIN_USERNAME]);
      if (rows.length === 0) {
        const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);
        await connection.promise().query('INSERT INTO users (username, password) VALUES (?, ?)', [process.env.ADMIN_USERNAME, hashedPassword]);
        const [adminUser] = await connection.promise().query('SELECT id FROM users WHERE username = ?', [process.env.ADMIN_USERNAME]);
        await connection.promise().query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [adminUser[0].id, 1]);
        
      }

      connection.release();
      console.log('Database created');
    });
  });
};

module.exports = initDB;