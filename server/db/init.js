const mysql = require('mysql2/promise');
const crypto = require('crypto');

const DB_NAME = 'product_mgmt';

const initDB = async () => {
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'root' });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();

  const db = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: DB_NAME });

  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      sku VARCHAR(255) NOT NULL UNIQUE,
      product_name VARCHAR(255),
      category VARCHAR(100),
      material VARCHAR(100),
      status VARCHAR(50),
      price DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS product_media (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT,
      media_url TEXT,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
  `);

  console.log("✅ Database and tables are ready");
  return db;
};

module.exports = initDB;
