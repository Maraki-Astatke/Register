const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    const decoded = JSON.parse(Buffer.from(credential.split('.')[1], 'base64').toString());
    
    console.log('Google user:', decoded.email);
    let user = await User.findByEmail(decoded.email);
    
    if (!user) {
      const createData = {
        name: decoded.name,
        email: decoded.email,
        phone: '',
        password: '',
        dob: '2000-01-01',
        location: '',
        emailVerificationToken: null,
        emailVerificationExpires: null
      };
      
      user = await User.create(createData);
      
      
      await User.verifyEmail(user.id);
      user = await User.findById(user.id);
    }
    
    const token = generateToken(user.id);
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, message: 'Google login failed' });
  }
};