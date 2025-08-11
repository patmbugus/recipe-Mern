# 🚀 FlavorShare Setup Guide

This guide will help you set up FlavorShare on your local machine for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB** (v6.0 or higher) - [Download here](https://www.mongodb.com/try/download/community)

### Optional Software
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Postman** - [Download here](https://www.postman.com/) (for API testing)
- **MongoDB Compass** - [Download here](https://www.mongodb.com/try/download/compass) (for database management)

## 🔧 Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/flavorshare.git

# Navigate to the project directory
cd flavorshare
```

### 2. Set Up MongoDB

#### Option A: Local MongoDB Installation

**Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Create a data directory: `mkdir C:\data\db`
4. Start MongoDB: `mongod`

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update the `.env` file with your Atlas connection string

### 3. Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit the `.env` file:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/flavorshare

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Important:** Change the `JWT_SECRET` to a secure random string!

### 4. Set Up Frontend

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install
```

### 5. Create Upload Directory

```bash
# Navigate back to backend
cd ../backend

# Create uploads directory
mkdir uploads
```

## 🚀 Running the Application

### Start Backend Server

```bash
# In the backend directory
npm run dev
```

The server will start on `http://localhost:5000`

### Start Frontend Application

```bash
# In a new terminal, navigate to client directory
cd client
npm start
```

The app will open in your browser at `http://localhost:3000`

## 🧪 Testing the Setup

### 1. Backend Health Check

Visit `http://localhost:5000/api/health` in your browser or use Postman.

Expected response:
```json
{
  "status": "OK",
  "message": "FlavorShare API is running",
  "timestamp": "2024-12-19T10:00:00.000Z"
}
```

### 2. Database Connection

Check the backend console for MongoDB connection messages:
```
✅ MongoDB connected successfully
```

### 3. Frontend Loading

The React app should load without errors in your browser.

## 🔍 Troubleshooting

### Common Issues

#### MongoDB Connection Failed

**Error:** `MongoServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. Ensure MongoDB is running:
   ```bash
   # Windows
   mongod
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. Check if MongoDB is running on the correct port:
   ```bash
   # Check if port 27017 is in use
   netstat -an | grep 27017
   ```

#### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Change the port in `.env`:
   ```env
   PORT=5001
   ```

2. Kill the process using the port:
   ```bash
   # Find the process
   lsof -i :5000
   
   # Kill it
   kill -9 <PID>
   ```

#### Frontend Build Errors

**Error:** `Module not found: Can't resolve 'react'`

**Solutions:**
1. Clear node_modules and reinstall:
   ```bash
   cd client
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check Node.js version compatibility:
   ```bash
   node --version
   # Should be 18.0.0 or higher
   ```

#### CORS Issues

**Error:** `Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solutions:**
1. Check CORS_ORIGIN in backend `.env`:
   ```env
   CORS_ORIGIN=http://localhost:3000
   ```

2. Restart the backend server after changing `.env`

### Environment-Specific Issues

#### Windows

- **Path Issues:** Use forward slashes in paths or escape backslashes
- **MongoDB Service:** Ensure MongoDB service is running in Services
- **Firewall:** Check Windows Firewall settings

#### macOS

- **Permissions:** Use `sudo` for system-level commands
- **Homebrew:** Ensure Homebrew is up to date
- **Port Conflicts:** Check for other services using the same ports

#### Linux

- **System Services:** Use `systemctl` commands for MongoDB
- **Permissions:** Ensure proper file permissions
- **Dependencies:** Install required system packages

## 📱 Development Tools

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **MongoDB for VS Code**
- **Thunder Client** (API testing)
- **Tailwind CSS IntelliSense**

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.js": "javascript",
    "*.jsx": "javascriptreact"
  }
}
```

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

### Test Coverage

```bash
# Backend
cd backend
npm run test:coverage

# Frontend
cd client
npm test -- --coverage --watchAll=false
```

## 📊 Database Management

### Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to the `flavorshare` database
4. Explore collections and documents

### Using MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Switch to database
use flavorshare

# Show collections
show collections

# Query documents
db.users.find()
db.recipes.find()
```

## 🔒 Security Considerations

### Development Environment

- Use strong JWT secrets
- Don't commit `.env` files
- Use local MongoDB for development
- Enable CORS only for development origins

### Production Environment

- Use environment variables for all secrets
- Enable HTTPS
- Use MongoDB Atlas or secure MongoDB instance
- Implement rate limiting
- Use secure session management

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🆘 Getting Help

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our community** discussions

---

**Happy coding! 🍳✨**

Your FlavorShare development environment should now be ready to go!
