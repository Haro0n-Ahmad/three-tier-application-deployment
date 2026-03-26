# ✦ TaskFlow — Full Stack Todo App

A production-ready full-stack Todo application built with **React**, **Node.js + Express**, and **MySQL**.

---

## 📁 Project Structure

```
todo-app/
├── package.json              ← Root (run both services together)
├── README.md
│
├── backend/                  ← Node.js + Express API
│   ├── package.json
│   ├── .env                  ← ⚠️ Configure your DB credentials here
│   ├── .env.example
│   └── src/
│       ├── server.js         ← Entry point (port 5000)
│       ├── config/
│       │   └── database.js   ← MySQL connection + auto-init
│       ├── models/
│       │   └── Todo.js       ← DB queries
│       ├── controllers/
│       │   └── todoController.js
│       ├── routes/
│       │   └── todoRoutes.js
│       └── middleware/
│           └── errorHandler.js
│
└── frontend/                 ← React App
    ├── package.json          ← proxy: "http://localhost:5000"
    ├── .env                  ← REACT_APP_API_URL
    └── src/
        ├── App.js
        ├── index.js
        ├── styles/App.css
        ├── services/api.js   ← Axios API layer
        ├── hooks/useTodos.js ← State management
        └── components/
            ├── StatsBar.js
            ├── TodoForm.js
            └── TodoCard.js
```

---

## ⚙️ Prerequisites

- **Node.js** v16+
- **MySQL** v8+ running locally
- **npm** v8+

---

## 🚀 Setup & Run

### Step 1 — Configure Database

Edit `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword   ← change this
DB_NAME=todo_db
```

> The database and tables are **auto-created** on first run.

### Step 2 — Install Dependencies

```bash
# From project root
npm run install:all
```

Or manually:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Step 3 — Run Both Servers

```bash
# From project root (runs both simultaneously)
npm run dev
```

Or run separately:
```bash
# Terminal 1 — Backend (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend && npm start
```

### Step 4 — Open App

- **Frontend:** http://localhost:3000
- **API:**      http://localhost:5000/api/health

---

## 🔌 API Endpoints

| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| GET    | /api/todos                | Get all todos (filterable) |
| GET    | /api/todos/stats          | Get counts/stats        |
| GET    | /api/todos/:id            | Get single todo         |
| POST   | /api/todos                | Create todo             |
| PUT    | /api/todos/:id            | Update todo             |
| PATCH  | /api/todos/:id/toggle     | Toggle complete         |
| DELETE | /api/todos/:id            | Delete todo             |
| DELETE | /api/todos/completed      | Delete all completed    |

### Query Parameters (GET /api/todos)
- `?completed=true|false`
- `?priority=low|medium|high`
- `?category=Work`
- `?search=keyword`

---

## ✨ Features

- ✅ Create, Read, Update, Delete todos
- ✅ Toggle complete/incomplete
- ✅ Priority levels (Low / Medium / High)
- ✅ Categories (Work, Personal, Shopping, etc.)
- ✅ Due dates
- ✅ Search & filter
- ✅ Stats dashboard
- ✅ Clear all completed
- ✅ Fully responsive UI
- ✅ MySQL auto-initialized on startup

---

## 🛠️ Common Issues

**Can't connect to MySQL?**
→ Check `backend/.env` DB credentials
→ Make sure MySQL is running: `mysql -u root -p`

**CORS errors?**
→ Ensure backend runs on port 5000 and frontend on 3000
→ Check `FRONTEND_URL` in `backend/.env`

**Port in use?**
→ Change `PORT` in `backend/.env` and update `REACT_APP_API_URL` in `frontend/.env`
