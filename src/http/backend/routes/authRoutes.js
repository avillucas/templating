const express = require('express');
const router = express.Router();

const { loginForm, registerForm, login, register } = require('../controllers/authController');
router.get('login', loginForm);
router.get('register', registerForm);
router.post('login', login);
router.post('register', register);

module.exports = router;