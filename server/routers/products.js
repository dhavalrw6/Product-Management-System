const express = require('express');
const crypto = require('crypto');
const router = express.Router();

module.exports = (db) => {
  const encryptSKU = (sku) => crypto.createHash('sha256').update(sku).digest('hex');

  // Get products with pagination + filters
  router.get('/', async (req, res) => {
    const { page = 1, limit = 5, sku, product_name, category, material, status } = req.query;
    const offset = (page - 1) * limit;

    let conditions = [];
    let values = [];

    if (sku) {
      conditions.push(`sku = ?`);
      values.push(encryptSKU(sku));
    }
    if (product_name) {
      conditions.push(`product_name LIKE ?`);
      values.push(`%${product_name}%`);
    }
    if (category) {
      conditions.push(`category = ?`);
      values.push(category);
    }
    if (material) {
      conditions.push(`material = ?`);
      values.push(material);
    }
    if (status) {
      conditions.push(`status = ?`);
      values.push(status);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const [rows] = await db.query(`SELECT * FROM products ${whereClause} LIMIT ? OFFSET ?`, [...values, +limit, +offset]);
    res.json(rows);
  });

  // Add new product (with encrypted SKU and duplicate check)
  router.post('/', async (req, res) => {
    const { sku, product_name, category, material, status, price } = req.body;
    const encryptedSKU = encryptSKU(sku);

    const [exists] = await db.query(`SELECT * FROM products WHERE sku = ?`, [encryptedSKU]);
    if (exists.length) return res.status(400).json({ message: 'SKU already exists' });

    await db.query(
      `INSERT INTO products (sku, product_name, category, material, status, price) VALUES (?, ?, ?, ?, ?, ?)`,
      [encryptedSKU, product_name, category, material, status, price]
    );
    res.sendStatus(201);
  });

  // Edit product
  router.put('/:id', async (req, res) => {
    const { product_name, category, material, status, price } = req.body;
    await db.query(
      `UPDATE products SET product_name = ?, category = ?, material = ?, status = ?, price = ? WHERE id = ?`,
      [product_name, category, material, status, price, req.params.id]
    );
    res.sendStatus(200);
  });

  // Delete product
  router.delete('/:id', async (req, res) => {
    await db.query(`DELETE FROM products WHERE id = ?`, [req.params.id]);
    res.sendStatus(204);
  });

  // Statistics
  router.get('/stats', async (req, res) => {
    const [stats] = await db.query(`
      SELECT
        JSON_OBJECTAGG(category, max_price) AS category_highest_price,
        (
          SELECT JSON_OBJECT(
            '0-500', COUNT(CASE WHEN price BETWEEN 0 AND 500 THEN 1 END),
            '501-1000', COUNT(CASE WHEN price BETWEEN 501 AND 1000 THEN 1 END),
            '1000+', COUNT(CASE WHEN price > 1000 THEN 1 END)
          )
          FROM products
        ) AS price_range_count,
        (
          SELECT JSON_ARRAYAGG(id)
          FROM products
          WHERE id NOT IN (SELECT DISTINCT product_id FROM product_media)
        ) AS no_media_products
    FROM (
      SELECT category, MAX(price) as max_price FROM products GROUP BY category
    ) AS grouped;
    `);

    res.json(stats[0]);
  });

  return router;
};
