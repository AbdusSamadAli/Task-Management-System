# 📝 Task Management System

A full-stack **Task Management System** built with **Next.js**, **Node.js**, **Prisma**, and **MySQL**, featuring secure JWT authentication, task CRUD operations, filtering, searching, and responsive UI.

---

## 🚀 Features

### 🔐 Authentication
- User **Registration & Login**
- **JWT-based authentication**
- Secure session handling
- Protected dashboard routes
- Logout functionality

### 📋 Task Dashboard
- View all tasks fetched from backend
- Responsive design (desktop & mobile)
- Real-time UI updates after actions

### ✏️ CRUD Operations
- ➕ Add new tasks
- ✏️ Edit existing tasks
- 🔁 Toggle task status (Completed / Pending)
- ❌ Delete tasks

### 🔍 Filtering & Search
- Filter tasks by:
  - All
  - Completed
  - Pending
- Search tasks instantly by title

### 🔔 Notifications
- Toast notifications for:
  - Task added
  - Task updated
  - Task deleted
  - Authentication actions

---

## 🧱 Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Hooks**
- **react-hot-toast** (notifications)

### Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **JWT Authentication**

### Database
- **MySQL**


---

## 🔐 Authentication Flow

1. User logs in / registers
2. Backend generates **JWT**
3. Token stored securely (HTTP-only cookie / localStorage as configured)
4. Protected routes validate token
5. Logout clears session and redirects to login

---


