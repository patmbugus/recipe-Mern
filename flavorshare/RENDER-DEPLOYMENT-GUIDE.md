# 🚀 Render Deployment Guide for FlavorShare Backend

This guide will walk you through deploying your FlavorShare backend to Render step by step.

## 📋 Prerequisites

Before deploying to Render, ensure you have:

✅ **GitHub repository** with your FlavorShare project  
✅ **MongoDB Atlas database** set up and running  
✅ **Environment variables** ready for production  
✅ **Render account** (free tier available)  

## 🎯 Step-by-Step Deployment

### **Step 1: Create Render Account**

1. **Go to [render.com](https://render.com)**
2. **Sign up** with GitHub (recommended) or email
3. **Verify your email** if using email signup

### **Step 2: Connect Your Repository**

1. **Click "New +"** in your Render dashboard
2. **Select "Web Service"**
3. **Connect your GitHub account** (if not already connected)
4. **Select your repository:** `patmbugus/recipe-Mern`
5. **Choose the main branch** (usually `main`)

### **Step 3: Configure Your Web Service**

#### **Basic Settings:**
- **Name:** `flavorshare-backend` (or your preferred name)
- **Environment:** `Node`
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `flavorshare/backend` (important!)

#### **Build & Deploy Settings:**
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** `Free` (for testing), `Starter` (for production)

### **Step 4: Environment Variables**

Click **"Environment"** tab and add these variables:

#### **Required Variables:**
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flavorshare?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d
```

#### **Optional Variables:**
```env
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads
CORS_ORIGIN=https://your-frontend-domain.netlify.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12
```

### **Step 5: Deploy**

1. **Click "Create Web Service"**
2. **Wait for build** (usually 2-5 minutes)
3. **Check build logs** for any errors
4. **Your service will be available** at: `https://your-service-name.onrender.com`

## 🔧 Advanced Configuration

### **Using render.yaml (Auto-Deploy)**

Your project already includes a `render.yaml` file for automatic configuration:

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
      - key: PORT
        value: 10000
      - key: MONGODB_URI
        sync: false  # Set this manually
      - key: JWT_SECRET
        sync: false  # Set this manually
```

**To use this:**
1. **Upload your `render.yaml`** to Render
2. **Render will auto-configure** your service
3. **Set sensitive environment variables** manually

### **Custom Domain Setup**

1. **Go to your service settings**
2. **Click "Custom Domains"**
3. **Add your domain** (e.g., `api.yourdomain.com`)
4. **Update DNS records** with your domain provider
5. **SSL certificate** is automatically provided

## 📊 Monitoring & Logs

### **Viewing Logs:**
1. **Go to your service dashboard**
2. **Click "Logs" tab**
3. **View real-time logs** and build history
4. **Download logs** for debugging

### **Health Checks:**
- **Automatic health checks** every 30 seconds
- **Service restarts** if health check fails
- **Uptime monitoring** in dashboard

## 🔄 Continuous Deployment

### **Automatic Deploys:**
- **Push to main branch** → Auto-deploy
- **Pull request** → Preview deployment
- **Manual deploy** from dashboard

### **Deploy Settings:**
- **Auto-deploy:** Enabled by default
- **Branch:** `main` (configurable)
- **Build cache:** Enabled for faster builds

## 🚨 Troubleshooting

### **Build Fails**

**Problem:** Build command fails
```
Error: npm install failed
```

**Solutions:**
1. **Check Node.js version** - ensure compatibility
2. **Verify package.json** exists in backend directory
3. **Check for syntax errors** in your code
4. **Review build logs** for specific errors

### **Service Won't Start**

**Problem:** Service starts but immediately crashes
```
Error: Cannot connect to MongoDB
```

**Solutions:**
1. **Verify MongoDB URI** is correct
2. **Check network access** from Render to MongoDB Atlas
3. **Ensure database exists** and is accessible
4. **Verify environment variables** are set correctly

### **Environment Variables Not Working**

**Problem:** Variables not accessible in your app
```
process.env.MONGODB_URI is undefined
```

**Solutions:**
1. **Check variable names** match exactly
2. **Ensure no spaces** in values
3. **Redeploy** after adding variables
4. **Verify variable scope** (environment vs. service)

### **CORS Issues**

**Problem:** Frontend can't connect to backend
```
CORS error: Access to fetch at '...' from origin '...' has been blocked
```

**Solutions:**
1. **Set CORS_ORIGIN** to your frontend URL
2. **Include protocol** (https://)
3. **Add multiple origins** if needed
4. **Check CORS middleware** configuration

## 📈 Performance Optimization

### **Free Tier Limitations:**
- **512MB RAM** - monitor memory usage
- **Shared CPU** - optimize database queries
- **Sleep after 15 minutes** - implement keep-alive

### **Optimization Tips:**
1. **Database indexing** for faster queries
2. **Connection pooling** for MongoDB
3. **Response caching** where appropriate
4. **Image compression** for uploads
5. **Rate limiting** to prevent abuse

## 💰 Cost Management

### **Free Tier:**
- **$0/month** - perfect for testing
- **Sleep after inactivity** - 15+ minutes
- **Cold start** - 30-60 seconds

### **Starter Plan ($7/month):**
- **Always on** - no sleeping
- **1GB RAM** - better performance
- **Shared CPU** - consistent performance
- **Custom domains** included

### **Professional Plan ($25/month):**
- **Dedicated CPU** - maximum performance
- **2GB RAM** - handle more users
- **Auto-scaling** - traffic management

## 🔐 Security Best Practices

### **Environment Variables:**
- **Never commit** sensitive data to Git
- **Use strong JWT secrets** (32+ characters)
- **Rotate secrets** regularly
- **Limit database access** to specific IPs

### **API Security:**
- **Rate limiting** enabled
- **Input validation** on all endpoints
- **JWT token expiration** (30 days max)
- **HTTPS only** (automatic with Render)

## 📱 Testing Your Deployment

### **Health Check Endpoint:**
```bash
curl https://your-service.onrender.com/health
```

### **API Test:**
```bash
# Test your recipes endpoint
curl https://your-service.onrender.com/api/recipes

# Test with authentication
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://your-service.onrender.com/api/recipes
```

### **Frontend Integration:**
Update your frontend environment variable:
```env
REACT_APP_API_URL=https://your-service.onrender.com
```

## 🎯 Next Steps After Deployment

1. **Test all API endpoints** thoroughly
2. **Monitor performance** and logs
3. **Set up alerts** for downtime
4. **Configure custom domain** if needed
5. **Deploy frontend** to Netlify
6. **Test full application** end-to-end

## 📞 Support Resources

### **Render Documentation:**
- [Render Docs](https://render.com/docs)
- [Node.js Deployment](https://render.com/docs/deploy-node-express-app)
- [Environment Variables](https://render.com/docs/environment-variables)

### **Common Issues:**
- [Build Failures](https://render.com/docs/troubleshooting-builds)
- [Service Crashes](https://render.com/docs/troubleshooting-services)
- [Database Connections](https://render.com/docs/databases)

---

## 🚀 Ready to Deploy?

Your FlavorShare backend is ready for Render! Follow these steps:

1. **✅ Create Render account**
2. **✅ Connect your repository**
3. **✅ Configure environment variables**
4. **✅ Deploy and test**
5. **✅ Update frontend API URL**

**Happy deploying! 🎉✨**

---

**Need help?** Check the troubleshooting section or refer to Render's documentation. Your `render.yaml` file will make the setup much easier!
