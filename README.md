# 🔐 Secure Notes Application (MERN Stack)

A full‑stack **Secure Notes web application** built using the **MERN stack**, focused on **authentication, security, and clean architecture**.
This project is designed to demonstrate **real‑world backend + frontend practices**.

---

## 📌 Project Overview

**Secure Notes** allows users to securely manage their personal notes. Each user can:

* Register and verify their email using OTP
* Login and logout securely
* Create, update, delete notes
* Mark notes as **completed** or **pending**
* Access only their own notes (strict data ownership)

The main focus of this project is **secure authentication**, **authorization**, and **production‑ready architecture**, not just UI.

---

## 🚀 Features

### 🔑 Authentication & Security

* User registration with **email OTP verification**
* Secure login using **JWT Access Token + Refresh Token**
* **HTTP‑only cookies** for token storage
* Automatic token refresh using **Axios Interceptors**
* Logout clears tokens and invalidates refresh token
* Password hashing using **bcrypt**
* Secrets managed using **.env environment variables**

### 📝 Notes Management

* Create, update, and delete notes
* Mark notes as **completed** or **pending**
* Users can only access and modify **their own notes**
* Notes are linked to users using MongoDB relations

### 🧠 Backend Architecture

* Clean **MVC structure** (Models, Controllers, Routes)
* Centralized error handling with custom error classes
* Reusable middleware for authentication & validation
* RESTful API design

### 🎨 Frontend

* Responsive UI built with **React + Tailwind CSS**
* Global state management using **Redux Toolkit**
* State persistence using **Redux Persist**
* API handling using **Axios**
* User feedback using toast notifications

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Redux Persist
* Tailwind CSS
* Axios
* React Router DOM
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* Nodemailer
* Cookie‑Parser
* CORS
* Helmet

---

## 📂 Project Structure

### Backend

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── utils/
 ├── db/
 ├── app.js
 └── index.js
```

### Frontend

```
src/
 ├── components/pages 
 ├── routes 
 ├── redux/
 ├── services/
 ├── utils/
 └── main.jsx
```

---

## 🔐 Authentication Flow (High Level)

1. User registers → OTP sent to email
2. User verifies email using OTP
3. User logs in → Access & Refresh tokens generated
4. Tokens stored securely in **HTTP‑only cookies**
5. If access token expires → Axios interceptor refreshes token automatically
6. User logs out → Tokens cleared

---

## ⚙️ Environment Variables

Create a `.env` file in the backend root:

```
PORT=5000
MONGODB_URI=mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=access_secret
ACCESS_TOKEN_EXPIRY=token_expiry_time
REFRESH_TOKEN_SECRET=refresh_secret
REFRESH_TOKEN_EXPIRY=token_expiry_time
EMAIL_USER=email
EMAIL_PASS=email_password
```

---

## ▶️ How to Run the Project

### Backend

```bash
npm install
npm run start
```

### Frontend

```bash
npm install
npm run dev
```

---

## 🎯 Learning Outcomes (As a Fresher)

Through this project, I learned:

* How real‑world authentication works using JWT & refresh tokens
* How to secure APIs and user data
* How to structure backend code for scalability
* How frontend and backend communicate securely
* How to manage global state in React
* How production‑level apps handle errors

---

## 📌 Why This Project Matters

This project is not just a CRUD app. It focuses on:

* Security
* Clean architecture
* Real authentication flows
* Production‑ready practices

It represents my understanding of **full‑stack development** as a fresher and my readiness to work on real product‑based applications.

---

## 👤 Author

**Gaurav Rawat**
MERN Stack Developer (Fresher)

---


