const User = require('../models/user');
const jwt = require('jsonwebtoken');
const db = require('../configs/initDB');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findByUsername(username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = new User(username, password);
  await user.save();
  const newUser = await User.findByUsername(username);
  await db.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [newUser.id, 3]); // Assuming role_id 3 is for reader
  res.status(201).json({
    _id: newUser.id,
    username: newUser.username,
    role: 'reader',
    token: generateToken(newUser.id),
  });
};

const authUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (user && (await User.matchPassword(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

module.exports = { registerUser, authUser };