# 🍳 FlavorShare

[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

FlavorShare is a modern, full-stack web platform designed for culinary enthusiasts to create, share, search, and discover recipes. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a seamless experience for recipe management and social cooking.

## ✨ Features

### 🔐 Authentication & User Management
- **Secure JWT-based authentication** with bcrypt password hashing
- **User registration and login** with form validation
- **Profile management** with customizable user information
- **Protected routes** and middleware-based authorization

### 🍽️ Recipe Management
- **Create, edit, and delete recipes** with rich text descriptions
- **Image upload support** using Multer middleware
- **Ingredient lists and cooking instructions** with step-by-step guidance
- **Cuisine categorization** and dietary preference tagging

### 🔍 Search & Discovery
- **Advanced search functionality** by recipe name, ingredients, or tags
- **Smart filtering system** by cuisine type, preparation time, and dietary preferences
- **Real-time search results** with instant feedback

### 💬 Social Features
- **Comment system** with real-time updates using Socket.io
- **Like and favorite recipes** for easy access
- **User interaction** and recipe sharing capabilities

### 🎨 Modern UI/UX
- **Responsive design** optimized for all devices
- **TailwindCSS styling** with modern, clean aesthetics
- **Accessibility-first approach** following WCAG guidelines
- **Dark/light mode support** (planned feature)

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router 6** - Client-side routing and navigation
- **TailwindCSS 3.3.6** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Socket.io Client** - Real-time communication
- **React Hook Form** - Form handling and validation
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Fast, unopinionated web framework
- **MongoDB 6.0+** - NoSQL database
- **Mongoose 8.0.3** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Socket.io 4.7.4** - Real-time bidirectional communication
- **Multer** - File upload middleware
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Development & Testing
- **Jest** - JavaScript testing framework
- **Supertest** - HTTP assertion library
- **Nodemon** - Development server with auto-restart
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
flavorshare/
├── 📁 backend/                 # Backend server
│   ├── 📁 src/
│   │   ├── 📁 controllers/     # Route controllers
│   │   ├── 📁 models/          # Database models
│   │   ├── 📁 routes/          # API routes
│   │   ├── 📁 middleware/      # Custom middleware
│   │   ├── 📁 seeders/         # Database seeding
│   │   ├── 📄 app.js           # Express app configuration
│   │   └── 📄 server.js        # Server entry point
│   ├── 📄 package.json         # Backend dependencies
│   ├── 📄 jest.config.js       # Jest configuration
│   └── 📄 README.md            # Backend documentation
├── 📁 client/                  # Frontend React app
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 pages/           # Page components
│   │   ├── 📁 context/         # React context providers
│   │   ├── 📁 utils/           # Utility functions
│   │   ├── 📁 styles/          # CSS and styling
│   │   ├── 📄 App.jsx          # Main app component
│   │   └── 📄 index.js         # App entry point
│   ├── 📁 public/              # Static assets
│   ├── 📄 package.json         # Frontend dependencies
│   └── 📄 tailwind.config.js   # TailwindCSS configuration
├── 📄 .gitignore               # Git ignore rules
└── 📄 README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **MongoDB** (v6.0 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flavorshare.git
   cd flavorshare
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/flavorshare
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   
   # File Upload
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=uploads/
   
   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:5000`

3. **Start the frontend application**
   ```bash
   cd client
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`

### Database Seeding (Optional)

To populate your database with sample data:
```bash
cd backend
npm run seed
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

### Running Tests in Watch Mode
```bash
# Backend
cd backend && npm run test:watch

# Frontend
cd client && npm test -- --watch
```

## 📦 Available Scripts

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run Jest tests
- `npm run seed` - Seed database with sample data
- `npm run test-connection` - Test MongoDB connection

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌐 Deployment

### Backend Deployment
- **Platforms**: Render, Railway, Heroku, DigitalOcean
- **Database**: MongoDB Atlas (recommended for production)
- **Environment**: Set production environment variables

### Frontend Deployment
- **Platforms**: Netlify, Vercel, GitHub Pages
- **Build Command**: `npm run build`
- **Publish Directory**: `build/`

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://yourdomain.com
```

## 🔧 Configuration

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `flavorshare`
3. Update the connection string in your `.env` file

### File Upload Configuration
- **Supported formats**: JPG, PNG, GIF
- **Maximum file size**: 5MB (configurable)
- **Storage**: Local file system (can be extended to cloud storage)

### Security Features
- **Helmet.js** for security headers
- **Rate limiting** to prevent abuse
- **CORS configuration** for cross-origin requests
- **Input validation** using express-validator

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Recipe Endpoints
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create new recipe
- `GET /api/recipes/:id` - Get recipe by ID
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Comment Endpoints
- `GET /api/recipes/:id/comments` - Get recipe comments
- `POST /api/recipes/:id/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access

**Port Already in Use**
- Change port in `.env` file
- Kill process using the port: `npx kill-port 5000`

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

**CORS Issues**
- Verify CORS_ORIGIN in backend `.env`
- Check frontend URL matches backend configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database
- **TailwindCSS** for the utility-first CSS framework
- **Open Source Community** for inspiration and support

## 📞 Support

If you have any questions or need help:
- **Open an issue** on GitHub
- **Check the documentation** in the respective README files
- **Review the code** for examples

---

**Made with ❤️ by the FlavorShare Team**

*Happy cooking and sharing! 🍳✨*