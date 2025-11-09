# ZenMénage Backend

This is the backend API for the ZenMénage household management application.

## Features

- User authentication (register, login, logout)
- Family/household management
- Task management (create, read, update, delete)
- Statistics and reporting
- Role-based access control

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Navigate to the backend directory:

```sh
cd backend
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file based on `.env.example`:

```sh
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```sh
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

## Usage

### Development

```sh
npm run dev
```

### Production

```text
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PUT /api/tasks/:id/toggle` - Toggle task completion status

### Family

- `GET /api/family` - Get family details
- `PUT /api/family/update` - Update family details
- `GET /api/family/invite` - Get invite code
- `POST /api/family/join` - Join family with invite code
- `POST /api/family/remove-member` - Remove member from family

### Statistics

- `GET /api/stats/dashboard` - Get dashboard statistics
- `GET /api/stats/weekly` - Get weekly statistics

## Database Schema

### User

- name (String)
- email (String, unique)
- password (String, hashed)
- role (String: 'admin' or 'member')
- family (ObjectId, ref to Family)
- avatar (String)
- isActive (Boolean)

### Family

- name (String)
- members (Array of ObjectIds, ref to User)
- createdBy (ObjectId, ref to User)
- inviteCode (String, unique)

### Task

- title (String)
- description (String)
- room (String)
- assignedTo (ObjectId, ref to User)
- family (ObjectId, ref to Family)
- priority (String: 'low', 'medium', 'high')
- status (String: 'todo', 'in-progress', 'completed')
- dueDate (Date)
- completedAt (Date)
- createdBy (ObjectId, ref to User)

## License

This project is licensed under the MIT License.