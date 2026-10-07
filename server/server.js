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

// Serve frontend static files in production if client/dist exists
const clientDistPath = path.join(__dirname, '../client/dist');
const fs = require('fs');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 CAMPUS 2.0 Backend Core running on http://localhost:${PORT}`);
  });
}

bootstrap();
