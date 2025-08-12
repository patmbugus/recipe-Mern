#!/bin/bash

# FlavorShare Auto-Detection Build Script
# This script automatically detects the project structure and builds accordingly

echo "🚀 Starting FlavorShare build process..."

# Function to detect project structure
detect_structure() {
    if [ -d "client" ] && [ -f "client/package.json" ]; then
        echo "🔄 Detected MERN stack structure - building from client directory"
        cd client
        npm install
        npm run build
        cd ..
        echo "✅ Build completed from client directory"
        return 0
    elif [ -f "package.json" ] && [ -d "src" ]; then
        echo "🔄 Detected standard React app structure"
        npm install
        npm run build
        echo "✅ Build completed from root directory"
        return 0
    elif [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
        echo "🔄 Detected frontend directory structure"
        cd frontend
        npm install
        npm run build
        cd ..
        echo "✅ Build completed from frontend directory"
        return 0
    else
        echo "⚠️  Unknown project structure, attempting standard build"
        npm install
        npm run build
        echo "✅ Standard build completed"
        return 0
    fi
}

# Function to find build output directory
find_build_dir() {
    if [ -d "client/build" ]; then
        echo "📁 Build output found in: client/build"
        return 0
    elif [ -d "build" ]; then
        echo "📁 Build output found in: build"
        return 0
    elif [ -d "dist" ]; then
        echo "📁 Build output found in: dist"
        return 0
    elif [ -d "frontend/build" ]; then
        echo "📁 Build output found in: frontend/build"
        return 0
    else
        echo "❌ No build output directory found!"
        return 1
    fi
}

# Main build process
echo "🔍 Detecting project structure..."
if detect_structure; then
    echo "🔍 Locating build output..."
    if find_build_dir; then
        echo "🎉 Build process completed successfully!"
        exit 0
    else
        echo "❌ Build output not found!"
        exit 1
    fi
else
    echo "❌ Build process failed!"
    exit 1
fi
