const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, dob, location } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    const existingPhone = await User.findByPhone(phone);
    if (existingPhone) {
      return res.status(400).json({ 
        success: false,
        message: 'Phone number already registered' 
      });
    }
   
    const hashedPassword = await User.hashPassword(password);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      dob,
      location,
      emailVerificationToken: null,
      emailVerificationExpires: null,
      is_email_verified: true  
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully! You can now login.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findByIdentifier(identifier);

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

   
    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        location: user.location
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findByVerificationToken(token);

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired verification token' 
      });
    }

    const verifiedUser = await User.verifyEmail(user.id);

    res.json({
      success: true,
      message: 'Email verified successfully! You can now login.',
      user: {
        id: verifiedUser.id,
        name: verifiedUser.name,
        email: verifiedUser.email
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};