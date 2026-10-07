const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { connectDB, getDbStatus } = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    project: 'CAMPUS 2.0 Operating System',
    db: getDbStatus(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 CAMPUS 2.0 Backend Core running on http://localhost:${PORT}`);
  });
}

bootstrap();
