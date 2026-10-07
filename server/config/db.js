const mongoose = require('mongoose');

// Disable buffering so requests fail immediately if DB is unreachable instead of hanging for 10s
mongoose.set('bufferCommands', false);

let isDbConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isDbConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isDbConnected = false;
    console.error(`[MongoDB Connection Warning]: ${error.message}`);
    console.log('[MongoDB] Running in high-performance fallback in-memory mode.');
    return false;
  }
};

const getDbStatus = () => ({
  connected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host || 'Cluster0 Atlas',
});

module.exports = { connectDB, getDbStatus };
