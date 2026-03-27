const express = require('express');
const router = express.Router();
const { signup, login, verifyEmail, getMe } = require('../controllers/authController');
const { validateSignup, validateLogin, checkValidation } = require('../middleware/validation');
const { protect } = require('../middleware/auth');


router.post('/signup', validateSignup, checkValidation, signup);
router.post('/login', validateLogin, checkValidation, login);
router.get('/verify-email/:token', verifyEmail);


router.get('/me', protect, getMe);

module.exports = router;