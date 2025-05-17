const express = require('express');
const { register, login } = require('../controllers/authController');
const validateInput = require('../utils/validateInput'); // Custom input validator

const router = express.Router();

// Register route with registration-specific validation
router.post('/register', (req, res, next) => {
  const validationError = validateInput(req.body, 'register');
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }
  next();
}, register);

// Login route with login-specific validation
router.post('/login', (req, res, next) => {
  const validationError = validateInput(req.body, 'login');
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }
  next();
}, login);

module.exports = router;
