const UserSequelize = require('../models/UserSequelize'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, dob, location } = req.body;

    const existingUser = await UserSequelize.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    const existingPhone = await UserSequelize.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ 
        success: false,
        message: 'Phone number already registered' 
      });
    }

    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await UserSequelize.create({
      name,
      email,
      phone,
      password,
      dob,
      location,
      email_verification_token: emailVerificationToken,
      email_verification_expires: emailVerificationExpires,
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

    const { Op } = require('sequelize');
    const user = await UserSequelize.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

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
    const { Op } = require('sequelize');
    
    const user = await UserSequelize.findOne({
      where: {
        email_verification_token: token,
        email_verification_expires: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=invalid-token`);
    }

    await user.update({
      is_email_verified: true,
      email_verification_token: null,
      email_verification_expires: null
    });

    res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
    
  } catch (error) {
    console.error('Email verification error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=verification-failed`);
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await UserSequelize.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
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