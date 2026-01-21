# Syntactic 📘

> **The Free Coding Encyclopedia**  
> *Master programming through a comprehensive, open-source knowledge base.*

---

## 📖 Overview

**Syntactic** is a modern, full-stack web application designed to serve as a premier resource for developers. It combines a high-performance static frontend for content delivery with a robust, secure Node.js backend for user management. The platform is fully containerized, ensuring a consistent development and deployment environment.

## 🚀 Key Features

### 🔐 Secure Identity Management
*   **Production-Grade Auth**: Built with **Argon2id** password hashing and **JWT** session management.
*   **Full Lifecycle**: Registration, Login, Forgot Password, OTP Verification, and Reset flows.
*   **Security First**: Implements Rate Limiting, Helmet security headers, and Input Validation.

### 📚 Knowledge Engine
*   **Rich Content Library**: Structured access to hundreds of articles and topics.
*   **Topic Hubs**: Dedicated landing pages for major technologies (Frontend, Backend, DevOps).
*   **Mega-Menu Navigation**: easy access to the entire encyclopedia.

### 💻 Technical Highlights
*   **Responsive Design**: Mobile-first architecture using modern CSS.
*   **Containerized Architecture**: Zero-config setup with Docker & Docker Compose.
*   **Automated Migrations**: Self-healing database schema management.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, ES6+ | Served via **Nginx** for high performance. |
| **Backend** | Node.js, Express | RESTful API architecture. |
| **Database** | MySQL 8.0 | Relational data storage with `mysql2`. |
| **Security** | Argon2, JWT | Industry-standard encryption and auth. |
| **DevOps** | Docker, Compose | Orchestration and containerization. |

---

## 📂 Project Structure

```text
c:\Projects\Syntactic\
├── 🐳 docker-compose.yml    # Main orchestration file
├── 📂 backend/              # Node.js Express API
│   ├── src/                 # Source code
│   │   ├── controllers/     # Route logic
│   │   ├── database/        # Migrations & Connection
│   │   ├── middleware/      # Auth & Validation
│   │   └── server.js        # Entry point
│   ├── Dockerfile           # Backend container config
│   └── package.json         # Dependencies
└── 📂 frontend/             # Static Web App
    ├── articles/            # Encyclopedia content
    ├── styles/              # Global CSS & Design Systems
    ├── scripts/             # Utility logic
    ├── index.html           # SPA entry points
    └── Dockerfile           # Nginx container config
```

---

## ⚙️ Setup & Run

### Option 1: Quick Start (Recommended with Docker)
The easiest way to run Syntactic is using Docker Compose, which handles the database, backend, and frontend automatically.

1.  **Prerequisites**: Ensure [Docker Desktop](https://www.docker.com/products/docker-desktop) is installed.
2.  **Clone & Enter**:
    ```bash
    git clone https://github.com/Arcynix/Syntactic.git
    cd Syntactic
    ```
3.  **Launch**:
    ```bash
    docker-compose up -d --build
    ```
4.  **Access**:
    *   Frontend: [http://localhost:8080](http://localhost:8080)
    *   Backend: [http://localhost:3000](http://localhost:3000)

### Option 2: Manual Setup (Local Development)
If you prefer running services individually without Docker:

#### 1. Database Setup
*   Install **MySQL** manually.
*   Create a database named `syntactic_db`.
*   Update `backend/src/config/database.js` or set environment variables to match your local credentials.

#### 2. Backend Setup
```bash
cd backend
npm install
# Create .env file with DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET
npm run migrate  # Run database migrations
npm run dev      # Start server on port 3000
```

#### 3. Frontend Setup
Since the frontend is vanilla JS/HTML, you can serve it with any static server.
```bash
cd frontend
# Example using python
python -m http.server 8080
# Or using npm request
npx http-server -p 8080
```

---

## 🧪 Test Credentials

A pre-seeded user account is available for immediate testing:

*   **Email**: `tester@example.com`
*   **Password**: `Password123!`

---

## 🔧 Development Workflow

*   **Frontend**: Edits to the `frontend/` folder are reflected on refresh. For stubborn caches, use `Ctrl+F5`.
*   **Backend**: The backend server runs with `nodemon` in development. Changes to `backend/src` will automatically restart the service.
*   **Database**: To reset the database state (if a reset script is available):
    ```bash
    npm run migrate  # inside backend container or directory
    ```

---

## 📄 License

This project is licensed under the **MIT License**.
