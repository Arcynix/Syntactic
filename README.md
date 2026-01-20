# Syntactic - The Free Coding Encyclopedia

Syntactic is a comprehensive, open-source coding knowledge base designed to help developers learn and master various programming languages and technologies.

## Project Structure

The project is divided into two main components:

- **Frontend**: A static site served by Nginx, containing HTML, CSS, and vanilla JavaScript.
- **Backend**: A Node.js Express API handling user authentication and profile management.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1.  **Clone the repository** (if applicable).
2.  **Environment Setup**:
    - Ensure `backend/.env` exists with necessary variables (DB credentials, JWT secret).
    - Example `.env` is provided in documentation or setup scripts.

3.  **Run with Docker Compose**:
    ```bash
    docker-compose up -d --build
    ```
    This command builds and starts the following services:
    - `frontend`: Accessible at `http://localhost:8080`
    - `backend`: Accessible at `http://localhost:3000`
    - `db`: MySQL database (port 3306)

4.  **Database Migration**:
    The backend service automatically runs migrations on startup using `schema.sql`.

## Test Credentials

A test user is pre-configured for development:

- **Email**: `tester@example.com`
- **Password**: `Password123!`

## Features

- **Rich Navigation**: Comprehensive mega-menus for topics and articles.
- **User Accounts**: Register, Login, My Profile, Settings.
- **Topic Hubs**: Dedicated pages for major tech stacks (Frontend, Backend, etc.).
- **Responsive Design**: Optimized for mobile and desktop viewing.

## Development

- **Frontend**: Edit files in `frontend/`. Changes typically require a page refresh (unless caching is aggressive, in which case add query params or disable cache).
- **Backend**: Edit files in `backend/`. The service runs via `nodemon` (in dev mode) or requires restart.

## License

MIT
