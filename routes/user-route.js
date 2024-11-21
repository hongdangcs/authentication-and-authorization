const express = require('express');
const { setRole } = require('../controllers/user');
const { protect } = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');

const router = express.Router();

router.put('/set-role', protect, roleMiddleware(['admin']), setRole);

module.exports = router;