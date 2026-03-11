const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

const initializeDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    // Create database if not exists
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await connection.execute(`USE \`${dbConfig.database}\``);

    // Create todos table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS todos (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        due_date DATE,
        category VARCHAR(100) DEFAULT 'General',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.end();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
};

module.exports = { pool, initializeDatabase };
