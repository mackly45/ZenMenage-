# ZenMénage - Complete Setup Guide

This guide will help you set up and run the complete ZenMénage application with both frontend and backend.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local installation or cloud account like MongoDB Atlas)

## Project Structure

```ini
ZenMénage/
├── backend/           # Backend API (Node.js + Express)
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── config/        # Configuration files
│   ├── __tests__/     # Test files
│   ├── server.js      # Entry point
│   └── package.json   # Backend dependencies
├── src/               # Frontend source (React + TypeScript)
│   ├── components/    # React components
│   ├── services/      # API service layer
│   └── ...            # Other frontend files
├── package.json       # Root package.json with scripts
└── README.md          # Project documentation
```

## Backend Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zenmenage
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
```

For MongoDB Atlas, use:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zenmenage
```

### 3. Start MongoDB

If using local MongoDB:

```bash
mongod
```

### 4. Run Backend Server

Development mode (with auto-restart):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The backend will be available at `http://localhost:5000`.

## Frontend Setup

### 1. Install Frontend Dependencies

From the root directory:

```bash
npm install
```

### 2. Run Frontend Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Running Both Frontend and Backend Together

### Option 1: Using concurrently (recommended)

From the root directory:

```bash
npm run dev:full
```

This will start both servers simultaneously.

### Option 2: Manual setup

1. Terminal 1 - Start backend:

```bash
cd backend
npm run dev
```

2. Terminal 2 - Start frontend:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PUT /api/tasks/:id/toggle` - Toggle task completion

### Family

- `GET /api/family` - Get family details
- `PUT /api/family/update` - Update family
- `GET /api/family/invite` - Get invite code
- `POST /api/family/join` - Join family
- `POST /api/family/remove-member` - Remove family member

### Statistics

- `GET /api/stats/dashboard` - Get dashboard stats
- `GET /api/stats/weekly` - Get weekly stats

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Watch Mode

```bash
cd backend
npm run test:watch
```

## Database Seeding

To populate the database with sample data:

```bash
cd backend
npm run seed
```

## Deployment

### Backend Deployment

1. Set environment variables for production

2. Run:

```bash
npm start
```

### Frontend Deployment

1. Build the production version:

```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting provider

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in `.env`
2. **MongoDB connection error**: Check MongoDB URI and ensure MongoDB is running
3. **CORS errors**: Ensure frontend and backend URLs are correctly configured

### MongoDB Connection

If you're having issues with MongoDB:

1. **Local MongoDB**: Ensure `mongod` is running
2. **MongoDB Atlas**:
   - Check your connection string
   - Ensure IP whitelist includes your IP
   - Verify username and password

### API Errors

1. **401 Unauthorized**: Check if you're sending the correct JWT token
2. **404 Not Found**: Verify the endpoint URL
3. **500 Server Error**: Check server logs for details

## Development Workflow

1. Create a feature branch
2. Make changes to frontend or backend
3. Test locally
4. Run tests
5. Commit and push changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.