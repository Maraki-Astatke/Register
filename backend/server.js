const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const googleRoutes = require('./routes/googleRoutes');
const { pool } = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Backend server is running!',
    endpoints: {
      signup: 'POST /api/auth/signup',
      login: 'POST /api/auth/login',
      verifyEmail: 'GET /api/auth/verify-email/:token',
      getMe: 'GET /api/auth/me (requires token)',
      google: 'POST /api/auth/google'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/auth', googleRoutes);

app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong on the server' 
    : err.message;
  res.status(500).json({ 
    success: false,
    message
  });
});

app.listen(PORT, () => {
  console.log(`\n Server running on http://localhost:${PORT}`);
  console.log(`\n Database connected`);
});