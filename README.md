# SnapURL

SnapURL is a secure, full-stack URL shortening application built using **NestJS** for the backend and **React (with Vite)** for the frontend. It includes authenticated user access, secure password handling, and token-based protected routes for URL shortening.

> ✅ Developed as part of the assignment: **"Authenticated URL Shortener" using NestJS and React**

---

## ✨ Features

- 🔐 **User Authentication** (Register/Login/Logout)
- 🔒 **Password Hashing** using bcrypt
- 🛡️ **JWT Authentication** for protected routes
- ✂️ **URL Shortening** (Create & Retrieve Short URLs)
- 🧑‍💻 **Frontend UI** built with React + Vite
- 🧪 Input validation & error handling

---

## 🛠 Tech Stack

| Layer    | Tech Used                                  |
|----------|------------------------------------------- |
| Frontend | React, Vite, TypeScript, Tailwind, Shadcn  |
| Backend  | NestJS, TypeScript                         |
| Auth     | JWT, bcrypt                                |
| DB       | mongodb                                    |

---

## 📦 Project Structure

```bash
snapurl/
├── backend/        # NestJS backend (API + auth + URL logic)
├── frontend/       # React frontend (login, register, shorten form)
└── README.md       # Project overview

git clone https://github.com/Muhammed-sahshad/snapurl.git
cd snapurl

cd backend
npm install
add .env
npm run start:dev

cd ../frontend
npm install
add .env
npm run dev

## 🔐 API Overview

### Auth Routes:
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login with credentials
- `POST /auth/logout` — Logout user 

### URL Routes (Protected):
- `POST /url/shorten` — Create a short URL 
- `GET /url/:code` — Redirects to the original URL
