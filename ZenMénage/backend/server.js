const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const familyRoutes = require('./routes/family');
const statsRoutes = require('./routes/stats');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
let db;

try {
  const mongoose = require('mongoose');
  console.log('Mongoose loaded successfully');
  global.mongoose = mongoose;
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zenmenage', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    global.mongoose = mongoose;
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.log('Using mock database for development');
    db = require('./config/db');
    global.db = db;
    global.mongoose = null;
  });
} catch (err) {
  console.log('Mongoose not available, using mock database');
  db = require('./config/db');
  global.db = db;
  global.mongoose = null;
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/stats', statsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'ZenMénage backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;