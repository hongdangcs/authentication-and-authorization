const express = require('express');
const { setRole } = require('../controllers/user');
const { protect } = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.put('/set-role', protect, roleMiddleware(['admin']), setRole);

module.exports = router;