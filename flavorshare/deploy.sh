#!/bin/bash

# 🚀 FlavorShare Deployment Script
# This script helps prepare your project for deployment

echo "🍳 FlavorShare Deployment Preparation"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "backend" ] && [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: FlavorShare MERN stack project"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env file not found"
    echo "   Please create it with your production environment variables"
    echo "   See DEPLOYMENT.md for details"
else
    echo "✅ Backend environment file found"
fi

# Check if build works
echo "🔨 Testing production build..."
cd client
if npm run build; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    echo "   Please fix build errors before deploying"
    exit 1
fi
cd ..

# Check if tests pass
echo "🧪 Running tests..."
cd backend
if npm test; then
    echo "✅ Backend tests passed"
else
    echo "⚠️  Warning: Backend tests failed"
    echo "   Consider fixing tests before deploying to production"
fi
cd ..

echo ""
echo "🎯 Deployment Preparation Complete!"
echo ""
echo "Next steps:"
echo "1. Set up MongoDB Atlas database"
echo "2. Choose your hosting platform (see DEPLOYMENT.md)"
echo "3. Deploy backend first"
echo "4. Deploy frontend"
echo "5. Test everything works"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo "�� Happy deploying!"
