📁 Project Structure

product-management-system/
│
├── client/         # React frontend
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/         # Node.js backend
│   ├── routers/
│   ├── controllers/
│   ├── db/
│   ├── index.js
│   └── ...
│
├── package.json    # Root - manages both server & client
├── README.md       # Documentation
🚀 Features
✅ Add, Edit, Delete Products
✅ List Products with Pagination
✅ Filter by SKU, Product Name, Category, Material, Status
✅ Auto Encrypt SKU on Save
✅ Prevent Duplicate SKUs
✅ Media Management
✅ Product Statistics:

Category-wise Highest Price

Price Range Product Count (0-500, 501-1000, 1000+)

Products Without Media

⚙️ Technologies Used
Frontend: React, Bootstrap

Backend: Node.js, Express

Database: MySQL

Utilities: Axios, Concurrently, Crypto

🛠️ Installation & Setup
1. Clone the Repository
bash

git clone https://github.com/your-username/product-management-system.git
cd product-management-system
3. Install Dependencies
Root Dependencies (for running client & server together)
bash

npm install
Client (React App)
bash

cd client
npm install
Server (Node + Express App)
bash
cd ../server
npm install
4. Setup MySQL Database
Open MySQL Workbench or terminal

Create the database:

sql
CREATE DATABASE IF NOT EXISTS product_db;
USE product_db;

-- Product Table
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(255) NOT NULL UNIQUE,
  product_name VARCHAR(255),
  category VARCHAR(255),
  material VARCHAR(255),
  status ENUM('active', 'inactive') DEFAULT 'active',
  price DECIMAL(10, 2)
);

-- Media Table (optional for media stats)
CREATE TABLE IF NOT EXISTS product_media (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  media_url TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
Update MySQL credentials in server/db.js or .env

4. Start the Application
At the root folder, run:

bash
npm run dev
This runs both:

Client: http://localhost:3000

Server: http://localhost:5000

📦 API Endpoints
📋 Products
➕ Add Product
http
POST /api/products
json
{
  "sku": "ABC123",
  "product_name": "Test Product",
  "category": "Electronics",
  "material": "Plastic",
  "status": "active",
  "price": "999.99"
}
🔁 Update Product
http
PUT /api/products/:id
❌ Delete Product
http
DELETE /api/products/:id
🔍 Get Products with Filters & Pagination
http
GET /api/products?sku=abc&category=Mobile&page=1&limit=5
📊 Get Product Statistics
http
GET /api/products/stats
Returns:

json
{
  "highestPrices": {
    "Electronics": 3000,
    "Clothing": 1500
  },
  "priceRanges": {
    "0-500": 2,
    "501-1000": 3,
    "1000+": 5
  },
  "noMedia": [
    { "id": 1, "product_name": "XYZ" },
    ...
  ]
}
🖥️ UI Preview
🧾 Product List
Table with product info, edit & delete

Pagination controls

Bootstrap styling

➕ Add/Edit Product
Reusable form

Dropdown for status (Active/Inactive)

📊 Stats Display
Auto fetched and rendered

JSON structure with styling

💡 Tips
Make sure status value is either active or inactive to avoid DB errors.

SKU is encrypted using Node crypto, but still must be unique.

If you get "Data truncated" error — verify your input matches database field types.

📜 License
MIT License. Free to use, modify and distribute
