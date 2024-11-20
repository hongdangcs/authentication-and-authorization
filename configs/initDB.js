const { pool } = require('./connectDB');
const fs = require('fs');
const path = require('path');

const initDB = async () => {
  const dbName = process.env.DB_NAME;
  const createDBQuery = `CREATE DATABASE IF NOT EXISTS ${dbName};`;
  const useDBQuery = `USE ${dbName};`;
  const createTablesQuery = fs.readFileSync(path.join(__dirname, '.sql'), 'utf-8');

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(createDBQuery, (error, results) => {
      if (error) throw error;
      connection.query(useDBQuery, (error, results) => {
        if (error) throw error;
        connection.query(createTablesQuery, (error, results) => {
          connection.release();
          if (error) throw error;
          console.log('Initialized database');
        });
      });
    });
  });
};

module.exports = initDB;