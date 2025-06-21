# 📘 Project Management System

A professional full-stack Project Management System built using **React** (Client) and **Node.js + MySQL** (Server).

---

## 📂 Project Structure

```
project-management-system/
├── client/        # Frontend - React + Vite
└── server/        # Backend - Node.js + Express + MySQL
```

---

## 🧑‍💻 Technology Stack

### 🔹 Frontend (React)
- React 19
- Bootstrap 5
- Axios for API calls
- Vite for fast dev/build
- ESLint for code quality

### 🔹 Backend (Node.js)
- Express 5
- MySQL2
- CORS
- Nodemon (development)

---

## 🚀 Setup Instructions

Follow these steps to run the project locally on **any system**:

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/your-username/project-management-system.git
cd project-management-system
```

---

### ✅ 2. Setup Backend (Server)

```bash
cd server
npm install
```

#### 🔐 Configure `.env` (if using)

Create a file named `.env` in the `server/` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=project_db
PORT=5000
```

#### ▶️ Run Server

```bash
# For development (auto-reloads)
npm run dev

# For production
npm start
```

---

### ✅ 3. Setup Frontend (Client)

```bash
cd ../client
npm install
```

#### ▶️ Run Client

```bash
# Start development server
npm run dev

# Preview production build
npm run preview
```

---

## 🌐 API Communication

The frontend communicates with the backend via **Axios** and **RESTful APIs**.  
Ensure the backend runs on `http://localhost:5000` (or update Axios base URL accordingly).

---

## 🧩 Folder Highlights

### `client/`
- `src/components` – Reusable UI components
- `src/pages` – Screens like Dashboard, Projects
- `src/services` – Axios functions

### `server/`
- `routes/` – API endpoints
- `controllers/` – Logic for each route
- `models/` – Database queries
- `config/db.js` – MySQL connection

---

## 💡 Developer Notes

- Compatible across machines (Windows/macOS/Linux)
- Minimal config needed: just run `npm install` in both folders
- Make sure MySQL is installed and configured
- Adjust CORS and ports if needed for your system

---

## 🔄 Future Enhancements

- JWT-based user login
- Real-time task tracking (Socket.io)
- Role-based access (Admin, Manager)
- Charts & Analytics Dashboard

---

## 📃 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Dhaval Leelawala** – [@Dhaval-github](https://github.com/dhavalrw6)