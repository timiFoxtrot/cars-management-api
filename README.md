# 🚗 Car Dealership Backend API

A backend RESTful API built with **Node.js**, **Express**, and **TypeScript** for managing a car dealership platform. It supports **JWT-based authentication**, CRUD operations for cars, managers, customers, and categories, as well as purchasing functionality and filtering.

---

## 🚀 Features

- 🔒 **Authentication** with JSON Web Tokens (JWT)
- 👨‍💼 Manager & Customer roles with authorization
- 🚘 CRUD operations for:
  - Cars
  - Managers
  - Categories
  - Customers
- 🛒 Car Purchase Endpoint
- 🔍 Car filtering by category, price range, and availability
- ✅ Input validation and global error handling
- 🧪 Unit tests with Jest
- 📬 API documentation via Postman

---

## 🧱 Technologies

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Jest** for testing
- **dotenv** for environment configs
- **ts-node-dev** for dev environment

---

## 🔐 Authentication

- JWT token is required for protected routes.
- Roles: `manager`, `customer`
- Add `Authorization: Bearer <token>` header to access protected routes.

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/timiFoxtrot/cars-management-api.git
cd cars-management-api
```

### 2. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a .env file in the project root with the following environment variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/car
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

## Running the Application

## Development

To run the project in development mode with hot reloading, use:

```
npm run start:dev
```

## Production

To build and run the application in production:

1.  Build the project:

```
npm run build
```

2.  Start the server:

```
npm start
```

### Scripts

- **Start Production:**
  npm start – Compiles TypeScript and starts the server.
- **Start Development:**
  npm run start:dev – Compiles TypeScript and starts the server with live reloading.
- **Build:**
  npm run build – Builds the project (compiles TypeScript).
- **Test:**
  npm test – Runs Jest tests.
