# 📘 Mentox Auth Service – Functional Overview

## 🛠️ Tech Stack
- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **JWT Authentication**
- **Cookie-based Refresh Token Handling**
- **Role-Based Access Control (RBAC)**
- **Modular File Structure**

---

## 📂 Folder Structure
```
src/
│
├── controllers/
│   └── auth/
│       ├── login.ts          // Handles login with JWT and refresh token cookie
│       ├── logout.ts         // Clears refresh token cookie
│       ├── refresh.ts        // Verifies refresh token & returns new access token
│       ├── register.ts       // Creates test user and hashes password
│
├── middlewares/
│   ├── authenticateJWT.ts    // Middleware to verify JWT & attach user to request
│   └── auth.middleware.ts    // Role & permission-based access control
│
├── models/
│   └── user.model.ts         // User schema with roles and permissions
│
├── routes/
│   ├── auth.routes.ts        // Auth-related routes: login, logout, refresh, register
│   ├── admin.routes.ts       // Admin access routes with RBAC & permission check
│   └── faculty.routes.ts     // Placeholder for future faculty routes
│
├── types/
│   ├── index.ts              // `UserPayload` type definition
│   └── express/index.d.ts    // Express Request extension with `user` property
│
├── utils/
│   └── jwt.ts                // JWT utility functions: create payload, tokens
│
└── index.ts                  // App entry point, loads env, routes, DB, server
```

---

## 🔐 Authentication & Authorization Features

### ✅ 1. **Login (`POST /api/auth/login`)**
- Validates user credentials
- Generates **Access Token**
- Generates **Refresh Token** and sends it as **HTTP-only cookie**
- Returns user info + access token

---

### 🔁 2. **Refresh Token (`POST /api/auth/refresh-token`)**
- Validates refresh token from cookie
- Issues a **new access token**

---

### 🚪 3. **Logout (`POST /api/auth/logout`)**
- Clears the refresh token cookie
- Client becomes effectively logged out

---

### 🧪 4. **Create Test User (`POST /api/auth/create-test-user`)**
- Creates a new user in MongoDB
- Hashes password before saving
- Automatically assigns permissions via pre-save hook

---

### 🛡️ 5. **JWT Middleware**
- `authenticateJWT.ts`: Verifies token, adds `req.user`
- Fails gracefully with 401 if token is invalid/missing

---

### 👮 6. **RBAC Middleware**
- `authorizeRole(...roles)`: Checks if user has one of the allowed roles
- `checkPermission(...permissions)`: Checks if user has required permissions

---

## 🔐 Admin Routes Examples

### `GET /api/admin/admin-panel`
- 🔒 Protected by `authorizeRole("Admin")`

### `GET /api/admin/admin-data`
- 🔒 Protected by `authenticateJWT + checkPermission("system_settings")`

---

## 🧠 Extras

### 🧩 Custom Type Extension
- You extended Express `Request` type globally:
  ```ts
  req.user?: UserPayload
  ```
  via `src/types/express/index.d.ts`

### 🛠️ tsconfig.json Customization
- `typeRoots` includes `src/types` to load global types
- Included all `src/**/*.ts` files

---

 Next

| Feature | Description |
|--------|-------------|
| Redis session store | To manage and invalidate refresh tokens (jti-based) |
| Email/password reset | Secure password recovery flow |
| User activity logs | Track login/logout/IPs for audit |
| 2FA / OTP auth | Add multi-factor login |
| Rate limiting | Prevent brute-force login attempts |
| API tests | Write integration tests for each route |
