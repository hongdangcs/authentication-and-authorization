const db = require('../config/db');
const bcrypt = require('bcryptjs');
const hashPassword = require('../utils/hashPassword');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async save() {
    this.password = await hashPassword(this.password);
    const [result] = await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [this.username, this.password]
    );
    return result;
  }

  static async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async matchPassword(enteredPassword, storedPassword) {
    return await bcrypt.compare(enteredPassword, storedPassword);
  }
}

module.exports = User;