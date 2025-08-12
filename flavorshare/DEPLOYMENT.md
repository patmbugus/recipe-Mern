# 🚀 FlavorShare Deployment Guide

This guide will walk you through deploying FlavorShare to various hosting platforms.

## 🎯 Recommended Hosting Stack

- **Backend**: Render (free tier) or Railway
- **Frontend**: Netlify (free tier)
- **Database**: MongoDB Atlas (free tier)

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] GitHub repository set up
- [ ] MongoDB Atlas account
- [ ] Environment variables ready
- [ ] Production build working locally

## 🔧 Backend Deployment

### Option 1: Render (Recommended for beginners)

#### Step 1: Prepare Your Backend
1. **Add a start script** to `backend/package.json`:
   ```json
   {
     "scripts": {
       "start": "node src/server.js",
       "dev": "nodemon src/server.js"
     }
   }
   ```

2. **Create a `render.yaml`** file in your root directory:
   ```yaml
   services:
     - type: web
       name: flavorshare-backend
       env: node
       plan: free
       buildCommand: cd backend && npm install
       startCommand: cd backend && npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: MONGODB_URI
           sync: false
         - key: JWT_SECRET
           sync: false
         - key: CORS_ORIGIN
           sync: false
   ```

#### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `flavorshare-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

5. **Add Environment Variables**:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your production JWT secret
   - `CORS_ORIGIN`: Your frontend URL (e.g., `https://your-app.netlify.app`)
   - `PORT`: `10000` (Render sets this automatically)

6. Click "Create Web Service"

#### Step 3: Get Your Backend URL
- Render will provide a URL like: `https://flavorshare-backend.onrender.com`
- Save this URL for your frontend configuration

### Option 2: Railway

#### Step 1: Deploy to Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect it's a Node.js app

#### Step 2: Configure Environment Variables
Add the same environment variables as Render:
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Your production JWT secret
- `CORS_ORIGIN`: Your frontend URL

#### Step 3: Deploy
Railway will automatically build and deploy your app.

### Option 3: Heroku

#### Step 1: Prepare for Heroku
1. **Install Heroku CLI**:
   ```bash
   # Windows
   winget install --id=Heroku.HerokuCLI
   
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku app**:
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Add MongoDB add-on**:
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-production-secret
   heroku config:set CORS_ORIGIN=https://your-frontend-url.com
   ```

6. **Deploy**:
   ```bash
   git add .
   git commit -m "Prepare for Heroku deployment"
   git push heroku main
   ```

## 🌐 Frontend Deployment

### Option 1: Netlify (Recommended)

#### Step 1: Prepare Your Frontend
1. **Update API base URL** in your frontend code to use your backend URL
2. **Build your project locally** to test:
   ```bash
   cd client
   npm run build
   ```

#### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `cd client && npm run build`
   - **Publish directory**: `client/build`
   - **Base directory**: Leave empty

5. Click "Deploy site"

#### Step 3: Configure Environment Variables
1. Go to Site settings → Environment variables
2. Add any frontend environment variables you need

#### Step 4: Custom Domain (Optional)
1. Go to Domain management
2. Add your custom domain
3. Follow DNS configuration instructions

### Option 2: Vercel

#### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a React app
5. Configure build settings if needed
6. Click "Deploy"

### Option 3: GitHub Pages

#### Step 1: Prepare for GitHub Pages
1. **Add homepage** to `client/package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/flavorshare"
   }
   ```

2. **Install gh-pages**:
   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

3. **Add scripts** to `client/package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

#### Step 2: Deploy
```bash
cd client
npm run deploy
```

## 🗄️ Database Setup

### MongoDB Atlas

#### Step 1: Create Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project
4. Build a free cluster (M0 tier)

#### Step 2: Configure Database Access
1. Go to Security → Database Access
2. Create a new database user
3. Set username and password (save these!)

#### Step 3: Configure Network Access
1. Go to Security → Network Access
2. Add IP address: `0.0.0.0/0` (allows all IPs)
3. Or add specific IPs for security

#### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Add `/flavorshare` at the end for your database name

## 🔧 Environment Variables Setup

### Backend Environment Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flavorshare?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-production-jwt-secret
CORS_ORIGIN=https://your-frontend-url.netlify.app
PORT=10000
```

### Frontend Environment Variables
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_ENVIRONMENT=production
```

## 📱 Update Frontend Configuration

### Update API Configuration
In your frontend code, update the API base URL:

```javascript
// src/utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  // ... other config
});
```

### Update CORS Configuration
Ensure your backend CORS_ORIGIN matches your frontend URL exactly.

## 🚀 Deployment Checklist

### Before Deploying
- [ ] All tests pass locally
- [ ] Production build works locally
- [ ] Environment variables are ready
- [ ] Database is accessible from hosting platform
- [ ] API endpoints are working

### After Deploying
- [ ] Backend is accessible
- [ ] Frontend loads without errors
- [ ] API calls work from frontend
- [ ] Database connections are working
- [ ] Authentication flows work
- [ ] File uploads work (if applicable)

## 🔍 Troubleshooting Deployment

### Common Issues

#### Backend Won't Start
- Check environment variables
- Verify MongoDB connection string
- Check build logs for errors
- Ensure all dependencies are in `package.json`

#### Frontend Build Fails
- Check for syntax errors
- Verify all imports are correct
- Check Node.js version compatibility
- Clear `node_modules` and reinstall

#### CORS Errors
- Verify CORS_ORIGIN matches frontend URL exactly
- Check backend environment variables
- Restart backend after changing CORS settings

#### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Verify database user credentials
- Test connection locally first

## 📊 Monitoring and Maintenance

### Health Checks
- Set up monitoring for your backend
- Monitor database performance
- Check application logs regularly
- Set up uptime monitoring

### Updates and Maintenance
- Keep dependencies updated
- Monitor security advisories
- Regular database backups
- Performance monitoring

## 💰 Cost Estimation

### Free Tier (Recommended for starting)
- **Backend**: Render (free) or Railway ($5/month credit)
- **Frontend**: Netlify (free)
- **Database**: MongoDB Atlas (free tier)
- **Total**: $0-5/month

### Production Tier
- **Backend**: Railway ($20/month) or DigitalOcean ($12/month)
- **Frontend**: Netlify Pro ($19/month) or Vercel Pro ($20/month)
- **Database**: MongoDB Atlas ($9/month)
- **Total**: $40-60/month

## 🎯 Next Steps

1. **Choose your hosting platform** based on your needs
2. **Set up MongoDB Atlas** database
3. **Deploy backend** first and test
4. **Deploy frontend** and configure
5. **Test all functionality** in production
6. **Set up monitoring** and alerts
7. **Configure custom domain** (optional)

---

**Happy deploying! 🚀✨**

Your FlavorShare application will be accessible to users worldwide once deployed!
