const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (userData) => {
    const { name, email, phone, password, dob, location, emailVerificationToken, emailVerificationExpires } = userData;
    
    const query = `
      INSERT INTO users (name, email, phone, password, dob, location, email_verification_token, email_verification_expires)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, name, email, phone, dob, location, is_email_verified, created_at
    `;
    
    const values = [name, email, phone, password, dob, location, emailVerificationToken, emailVerificationExpires];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findByIdentifier: async (identifier) => {
    const query = `SELECT * FROM users WHERE email = $1 OR phone = $1`;
    const result = await pool.query(query, [identifier]);
    return result.rows[0];
  },
  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },
  findByPhone: async (phone) => {
    const query = `SELECT * FROM users WHERE phone = $1`;
    const result = await pool.query(query, [phone]);
    return result.rows[0];
  },
  findByVerificationToken: async (token) => {
    const query = `
      SELECT * FROM users 
      WHERE email_verification_token = $1 
      AND email_verification_expires > NOW()
    `;
    const result = await pool.query(query, [token]);
    return result.rows[0];
  },
  verifyEmail: async (userId) => {
    const query = `
      UPDATE users 
      SET is_email_verified = TRUE, 
          email_verification_token = NULL, 
          email_verification_expires = NULL 
      WHERE id = $1 
      RETURNING id, name, email, is_email_verified
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  },


  findById: async (id) => {
    const query = `
      SELECT id, name, email, phone, dob, location, is_email_verified, created_at 
      FROM users 
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  comparePassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
};

module.exports = User;