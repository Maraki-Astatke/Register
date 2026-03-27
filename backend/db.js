const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database!');

    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'users'
    `);
    
    if (result.rows.length > 0) {
      console.log('Users table exists!');
    } else {
      console.log('Users table not found');
    }
    
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();