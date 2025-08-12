@echo off
chcp 65001 >nul
echo 🍳 FlavorShare Deployment Preparation
echo =====================================

REM Check if we're in the right directory
if not exist "package.json" (
    if not exist "backend" (
        if not exist "client" (
            echo ❌ Error: Please run this script from the project root directory
            pause
            exit /b 1
        )
    )
)

echo ✅ Project structure verified

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit: FlavorShare MERN stack project"
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check if .env files exist
if not exist "backend\.env" (
    echo ⚠️  Warning: backend\.env file not found
    echo    Please create it with your production environment variables
    echo    See DEPLOYMENT.md for details
) else (
    echo ✅ Backend environment file found
)

REM Check if build works
echo 🔨 Testing production build...
cd client
call npm run build
if %errorlevel% equ 0 (
    echo ✅ Frontend build successful
) else (
    echo ❌ Frontend build failed
    echo    Please fix build errors before deploying
    cd ..
    pause
    exit /b 1
)
cd ..

REM Check if tests pass
echo 🧪 Running tests...
cd backend
call npm test
if %errorlevel% equ 0 (
    echo ✅ Backend tests passed
) else (
    echo ⚠️  Warning: Backend tests failed
    echo    Consider fixing tests before deploying to production
)
cd ..

echo.
echo 🎯 Deployment Preparation Complete!
echo.
echo Next steps:
echo 1. Set up MongoDB Atlas database
echo 2. Choose your hosting platform (see DEPLOYMENT.md)
echo 3. Deploy backend first
echo 4. Deploy frontend
echo 5. Test everything works
echo.
echo 📚 For detailed instructions, see DEPLOYMENT.md
echo 🚀 Happy deploying!
pause
