# Node.js Express API

## Overview

This is a Node.js API built with Express, MySQL, and additional utilities for validation, authentication, and environment configuration.

## Features

- **Express.js** for building the server
- **MySQL2** for database integration
- **Express Validator** for request validation
- **dotenv** for environment variable management
- **Middleware support** for authentication
- **Utility functions** for common operations (error handling, mailer, security, etc.)
- **Environment-based configuration** with `.env` files

## Project Structure

```
📂 class
 └── department.class.js
📂 config
 └── db.config.js
📂 constants
 └── constant.js
📂 controllers
 ├── index.ctrl.js
 ├── department.ctrl.js
📂 env
 ├── .env.development
 ├── .env.production
📂 middleware
 └── auth.middleware.js
📂 routes
 ├── index.route.js
 ├── department.route.js
📂 utils
 ├── common.utils.js
 ├── error.utils.js
 ├── mailer.utils.js
 ├── moment.utils.js
 ├── response.utils.js
 ├── security.utils.js
📂 validators
 ├── common.validator.js
 ├── department.validator.js
.gitignore
.prettierignore
.prettierrc
package-lock.json
package.json
server.js
```

## Available Scripts

- `npm run dev` - Starts the server using Nodemon (auto-restarts on changes).
- `npm start` - Runs the server in production mode.

## Configuration

- **Database:** Configure your MySQL database in `config/db.config.js`
- **Environment Variables:** Use `.env.development` and `.env.production` for different environments.

## API Routes

All API requests use the `POST` method.

| Method | Route                           | Description                              |
| ------ | ------------------------------- | ---------------------------------------- |
| POST   | `/department/v1/api_selection`  | Fetch all department records             |
| POST   | `/department/v1/api_selectbyid` | Fetch department record by ID            |
| POST   | `/department/v1/api_selectall`  | Fetch department records with pagination |
| POST   | `/department/v1/api_insert`     | Insert a new department record           |
| POST   | `/department/v1/api_update`     | Update an existing department record     |
| POST   | `/department/v1/api_deletebyid` | Remove a department record by ID         |

## Middleware

- **Authentication:** `middleware/auth.middleware.js` manages auth-based access control.

## Validators

- Request validation is handled in `validators/` using `express-validator`.

## Utilities

- Error handling, security, mailer, and response formatting are available in the `utils/` directory.

## Development Tools

- **Nodemon** for auto-restarting the server during development.
- **Prettier** for code formatting.
- **Cross-env** for setting environment variables in scripts.
