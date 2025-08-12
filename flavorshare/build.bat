@echo off
REM FlavorShare Auto-Detection Build Script for Windows
REM This script automatically detects the project structure and builds accordingly

echo 🚀 Starting FlavorShare build process...

REM Function to detect project structure
:detect_structure
if exist "client\package.json" (
    if exist "client\src" (
        echo 🔄 Detected MERN stack structure - building from client directory
        cd client
        call npm install
        call npm run build
        cd ..
        echo ✅ Build completed from client directory
        goto :find_build_dir
    )
)

if exist "package.json" (
    if exist "src" (
        echo 🔄 Detected standard React app structure
        call npm install
        call npm run build
        echo ✅ Build completed from root directory
        goto :find_build_dir
    )
)

if exist "frontend\package.json" (
    if exist "frontend\src" (
        echo 🔄 Detected frontend directory structure
        cd frontend
        call npm install
        call npm run build
        cd ..
        echo ✅ Build completed from frontend directory
        goto :find_build_dir
    )
)

echo ⚠️  Unknown project structure, attempting standard build
call npm install
call npm run build
echo ✅ Standard build completed

:find_build_dir
echo 🔍 Locating build output...

if exist "client\build" (
    echo 📁 Build output found in: client\build
    goto :success
)

if exist "build" (
    echo 📁 Build output found in: build
    goto :success
)

if exist "dist" (
    echo 📁 Build output found in: dist
    goto :success
)

if exist "frontend\build" (
    echo 📁 Build output found in: frontend\build
    goto :success
)

echo ❌ No build output directory found!
exit /b 1

:success
echo 🎉 Build process completed successfully!
exit /b 0
