# Task Management App - Backend

Backend REST API for the Task Management System built with Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, and JWT Authentication.

---

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing
* Protected Routes

### Task Management

* Create Tasks
* Retrieve Tasks
* Update Tasks
* Delete Tasks
* Task Status Tracking
* Priority Management
* Due Date Support
* Search, Filter & Pagination

### Database

* PostgreSQL
* Prisma ORM
* Database Migrations

---

## 🧱 Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT
* bcrypt
* dotenv

---

## 📦 Installation

Clone the repository:

```bash
git clone <backend-repository-url>
cd server
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_manager"
JWT_SECRET=your_jwt_secret_key
PORT=5000
JWT_EXPIRES_IN=your_expiry_date
FRONTEND_URL=your_frontend_url_with_port
```

---

## 🗄️ Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Optional: Open Prisma Studio

```bash
npx prisma studio
```

---

## ▶️ Running the Server

Development mode:

```bash
npm run dev
```

Server will run at:

```text
http://localhost:5000
```

---

## 🏗️ Production Build

Build TypeScript:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## 📚 API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/signup
```

#### Login User

```http
POST /api/auth/login
```

---

### Tasks

#### Get All Tasks

```http
GET /api/tasks
```

#### Get Task By ID

```http
GET /api/tasks/:id
```

#### Create Task

```http
POST /api/tasks
```

#### Update Task

```http
PUT /api/tasks/:id
```

#### Delete Task

```http
DELETE /api/tasks/:id
```

---

## 📁 Suggested Folder Structure

```text
src/
├── controllers/
├── routes/
├── middleware/
├── services/
├── prisma/
├── utils/
├── types/
└── app.ts
```

---

## 🔐 Authentication

Protected routes require a JWT token:

```http
Authorization: Bearer <token>
```

