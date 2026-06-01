# 🔐 MERN Authentication System

A complete full-stack authentication system built with the MERN stack featuring secure login, registration, profile management, and password reset functionality.

---

## 📋 Table of Contents
- Project Overview
- Features
- Tech Stack
- Project Structure
- Prerequisites
- Installation
- Environment Variables
- Running the Application
- API Endpoints
- Frontend Routes
- Usage Guide
- Error Handling
- Security Features
- Contributing
- License

---

## 🚀 Project Overview

This project is a production-ready authentication system built using the MERN stack. It provides secure user authentication with JWT, password reset via email, and protected routes. The UI is modern, responsive, and built with glassmorphism design principles.

---

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Secure login with JWT authentication
- Logout functionality
- Protected routes
- Session management

### 👤 User Management
- View user profile
- Update profile (name, email)
- Change password
- Delete account

### 📧 Password Reset Flow
- Forgot password via email
- Secure reset token (expires in 15 minutes)
- Email notification using Nodemailer
- One-time reset link

### 🎨 UI/UX
- Modern glassmorphism UI
- Fully responsive design
- Toast notifications
- Loading states
- Form validation
- Error handling

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM v6
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer
- dotenv

---

## 📁 Project Structure

mern-auth/
│
├── backend/
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ 
│ ├── controllers/
│ │ ├── authController.js
│ │ 
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── config/
│ │ ├── db.js
│ │ 
│ ├── utils/
│ │ └── generateToken.js
| | └── sendMail.js
│ ├── .env
│ └── index.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Profile.jsx
│ │ │ ├── Forgot.jsx
│ │ │ └── Reset.jsx
│ │ ├── routes/
│ │ │ ├── MainRoutes.jsx
│ │ ├── api/
│ │ │ └── api.js
│ │ │ └── authService.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── app.css
│ ├── .env
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── README.md

---

## 🔒 Security Features

- Password hashing using bcryptjs (salt rounds)
- JWT-based authentication
- Token expiration (7 days auth / 15 mins reset)
- Input validation for all requests
- XSS protection via React
- Environment variables for sensitive data

---
## 📦 Installation

```bash
# Clone repository
git clone https://github.com/arunjo96/mern_auth.git
