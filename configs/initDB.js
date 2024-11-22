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

  try {
    const connection = await pool.getConnection();
    await connection.query(createDBQuery);
    await connection.query(createTablesQuery);

    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [process.env.ADMIN_USERNAME]);
    if (rows.length === 0) {
      const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);
      await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [process.env.ADMIN_USERNAME, hashedPassword]);
      const [adminUser] = await connection.query('SELECT id FROM users WHERE username = ?', [process.env.ADMIN_USERNAME]);
      await connection.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [adminUser[0].id, 1]);
      console.log('Admin user created');
    }

    connection.release();
    console.log('Database and tables created or already exist');
  } catch (error) {
    console.error('Error initializing database:', error.message);
  }
};

module.exports = initDB;