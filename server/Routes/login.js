const express = require('express');
const { authenticateUser } = require('./../Middleware/authMiddleware');
const verifyToken = require('./../Middleware/verifyToken');

const router = express.Router();

// Route to authenticate the user and get a token
router.post('/login', authenticateUser);

// Protected route example
router.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = router;
