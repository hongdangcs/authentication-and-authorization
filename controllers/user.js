const db = require('../configs/connectDB');
const User = require('../models/user');

const setRole = async (req, res) => {
  const { userId, roleId } = req.body;
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  await db.execute('UPDATE user_roles SET role_id = ? WHERE user_id = ?', [roleId, userId]);
  res.status(200).json({ message: 'User role updated' });
};

module.exports = { setRole };