const User = require('../models/user');
const jwt = require('jsonwebtoken');
const db = require('../configs/connectDB').pool;
const bcrypt = require('bcryptjs');
const hashPassword = require('../utils/hash-password');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_CODE, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findByUsername(username);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    const user = new User(username, hashedPassword);
    await user.save();
    const newUser = await User.findByUsername(username);
    await db.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [newUser.id, 3]); // Assuming role_id 3 is for reader
    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      role: 'reader',
      token: generateToken(newUser.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    console.log("Login execute for: ", user);
    
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, login, logout };