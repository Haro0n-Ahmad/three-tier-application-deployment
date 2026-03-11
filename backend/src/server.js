require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Todo API is running!', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/todos', todoRoutes);

// ─── 404 & Error handlers ─────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start server ─────────────────────────────────────────────
const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 API Docs: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
