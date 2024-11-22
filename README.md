# Authorization System

This project is an authorization system built with Node.js, Express, and MySQL. It supports user registration, login, and role-based access control with three types of users: administrator, editor, and reader.

## Features

- User registration and login
- Role-based access control (admin, editor, reader)
- JWT-based authentication
- Password hashing with bcrypt
- Database initialization with default admin account
- API endpoints for user management

## Requirements

- Node.js
- MySQL

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/authorization-system.git
   cd authorization-system
   ``# Authorization System

This project is an authorization system built with Node.js, Express, and MySQL. It supports user registration, login, and role-based access control with three types of users: administrator, editor, and reader.

## Features

- User registration and login
- Role-based access control (admin, editor, reader)
- JWT-based authentication
- Password hashing with bcrypt
- Database initialization with default admin account
- API endpoints for user management

## Requirements

- Node.js
- MySQL

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/authorization-system.git
   cd authorization-system
   ```
2. Install the dependencies:
   ```sh
    npm install
    ```
3. Set up the database:
4. Create a `.env` file in the root directory following the example in `.env.example`:
   ```sh
   cp .env.example .env
   ```
5. Start the server:
   ```sh
    npm start
    ```
   
## API Endpoints
### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

## Project Structure
project-root/
│
├── controllers/
│   ├── auth.js
│   ├── user.js
│
├── models/
│   ├── user.js
│
├── middlewares/
│   ├── auth-middleware.js
│   └── role-middleware.js
│
├── routes/
│   ├── auth-routes.js
│   ├── user-routes.js
│
├── config/
│   ├── .sql
│   ├── connectDB.js
│   └── initDB.js
│
├── utils/
│   └── hash-password.js
│
├── .env
└── index.js