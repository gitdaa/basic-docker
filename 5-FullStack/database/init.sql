-- Create database if not exists
CREATE DATABASE IF NOT EXISTS fullstack_db;

USE fullstack_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, age) VALUES
('กฤษดา สุมาลัย', 'gityo@example.com', 30),
('จตุชัย ศรีคำม้วน', 'jatuchai@example.com', 99),
('สมชาย ใจดี', 'somchai@example.com', 99)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Create index for better performance
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_name ON users(name);

-- Show tables
SHOW TABLES;
SELECT 'Database initialized successfully!' as message;