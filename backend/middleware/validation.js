const { body, validationResult } = require('express-validator');


const validateSignup = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Valid email is required')
  .custom((value) => {
    const allowedDomains = ['gmail.com', 'yahoo.com', 'icloud.com'];
    const domain = value.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      throw new Error('Email must be from Gmail, Yahoo, or iCloud');
    }
    return true;
  }),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Phone number must be 10-15 digits'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least one uppercase, one lowercase, one number, and one special character (@$!%*?&)'),
  
  body('dob')
    .isISO8601()
    .withMessage('Valid date of birth is required'),
  
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters')
];


const validateLogin = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage('Email or phone number is required'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];


const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

module.exports = { validateSignup, validateLogin, checkValidation };