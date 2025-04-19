const express = require('express');
const cors = require('cors');
const initDB = require('./db/init');

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  const db = await initDB();
  const productRoutes = require('./routers/products')(db);
  app.use('/api/products', productRoutes);

  app.listen(5000, () => {
    console.log('✅ Server running at http://localhost:5000');
  });
};

start();
