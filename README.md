# Task Grading Hub

A Node.js + TypeScript (Express) backend API for:
- User authentication (register/login with JWT)
- Creating and listing tasks (with deadlines)
- Submitting task solutions as **PDF uploads**
- Admin grading of submissions
- Viewing grades for the logged-in user
- Auto-generated API docs using **Swagger UI** at `/docs`

---

## Tech Stack

- **TypeScript** (100%)
- **Node.js / Express**
- **MongoDB + Mongoose**
- **JWT** authentication
- **bcrypt** for password hashing
- **multer** for file uploads (PDF only)
- **express-validator** for server-side validation
- **Swagger**: `swagger-jsdoc` + `swagger-ui-express`

---

## Project Structure

```txt
src/
  app.ts
  swagger.ts
  controllers/
    auth.controller.ts
    task.controller.ts
    submission.controller.ts
  middlewares/
    isAuth.ts
    isAdmin.ts
    validators.ts
  models/
    user.model.ts
    task.model.ts
    submission.model.ts
    grade.model.ts
  routes/
    auth.route.ts
    task.route.ts
    submission.route.ts
  utils/
    jwt.ts
```

---

## Setup & Installation

### 1) Install dependencies
```bash
npm install
```

### 2) Create a `.env` file
Create a `.env` file in the repository root:

```env
PORT=3000
DB_LOCAL=mongodb://127.0.0.1:27017/task-grading-hub
JWT_SECRET=your_secret_here
```

> `DB_LOCAL` is used by the app to connect to MongoDB.

### 3) Run in development
```bash
npm run dev
```

### 4) Build & run production
```bash
npm run build
npm start
```

---

## API Documentation (Swagger)

After starting the server, open:

- `http://localhost:3000/docs`

Swagger is configured in `src/swagger.ts` and mounted in `src/app.ts`:

- Swagger spec uses OpenAPI 3.0
- JWT bearer auth scheme is defined (`bearerAuth`)
- JSDoc comments are read from:
  - `src/routes/*.ts`
  - `src/controllers/*.ts`

---

## Authentication

JWT is returned from login and should be used as:

```
Authorization: Bearer <token>
```

---

## Validation

Validation middleware is defined in:

- `src/middlewares/validators.ts`

Includes:
- `loginValidator`
- `registerValidator`
- `pdfValidator`
- `validate` (sends `400` with `errors: [...]`)

---

## Notes / Known Behaviors

- The server uses an error handler that returns HTTP **501** with:
  ```json
  { "status": "error", "message": "<error message>" }
  ```

---

## License

ISC