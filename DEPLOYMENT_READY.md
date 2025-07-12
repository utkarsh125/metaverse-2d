# 🚀 Deployment Guide - Metaverse 2D Application

## ✅ Fixed Issues
I've identified and fixed critical issues in your deployment configuration:

### 🔧 **Dockerfile Fixes Applied**
- ✅ Fixed Docker context paths in all Dockerfiles (frontend, http, ws)
- ✅ Updated package.json copy paths to work with nested directory structure
- ✅ Fixed render.yaml configuration
- ✅ Added proper CORS configuration

### 📊 **Application Architecture**
```
metaverse-2d/                    (Repository root)
├── metaverse/                   (Application root)
│   ├── apps/
│   │   ├── frontend/           (Next.js - Port 3001)
│   │   ├── http/               (Express API - Port 3000)
│   │   └── ws/                 (WebSocket - Port 4000)
│   ├── packages/db/            (Database package)
│   └── Docker files
```

---

## 🐳 **Option 1: Local Docker Deployment (Recommended for Testing)**

### Quick Start:
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services will be available at:
- **Frontend**: http://localhost:3001
- **API**: http://localhost:3000
- **WebSocket**: ws://localhost:4000
- **Database**: postgresql://metaverse_user:metaverse_password@localhost:5432/metaverse

---

## 🌐 **Option 2: Render.com Deployment (Recommended for Production)**

### ✅ **Prerequisites**
1. GitHub repository with your code
2. Render.com account
3. All Docker issues fixed (✅ Done)

### 🚀 **Deployment Steps**

#### Step 1: Push Updated Code
```bash
git add .
git commit -m "Fix Docker configuration for deployment"
git push origin main
```

#### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Select the `metaverse-2d` repository
5. Render will automatically detect the `render.yaml` file
6. Click "Apply"

#### Step 3: Monitor Deployment
- **Database**: Creates first (takes 2-3 minutes)
- **API Server**: Builds and starts (takes 5-8 minutes)
- **WebSocket**: Builds and starts (takes 5-8 minutes)
- **Frontend**: Builds and starts (takes 8-12 minutes)

#### Step 4: Access Your Application
After deployment completes:
- **Frontend**: `https://metaverse-frontend.onrender.com`
- **API**: `https://metaverse-api.onrender.com`
- **WebSocket**: `wss://metaverse-ws.onrender.com`

### 🔧 **Environment Variables (Auto-configured)**
- `DATABASE_URL`: Auto-generated from PostgreSQL service
- `JWT_PASSWORD`: Auto-generated secure secret
- `CORS_ORIGIN`: Set to frontend URL
- `NEXT_PUBLIC_API_URL`: Points to API service
- `NEXT_PUBLIC_WS_URL`: Points to WebSocket service

---

## 🚂 **Option 3: Railway Deployment**

### ✅ **Prerequisites**
1. Railway account
2. GitHub repository connected
3. PostgreSQL service created on Railway

### 🚀 **Deployment Steps**

#### Step 1: Create PostgreSQL Database
1. Go to Railway Dashboard
2. Create new PostgreSQL service
3. Note the connection string

#### Step 2: Deploy HTTP API
1. Create new service
2. Connect GitHub repo
3. Set root directory: `metaverse`
4. Use `railway-api.json` config
5. Set environment variables:
   ```
   DATABASE_URL=<your-postgres-connection-string>
   JWT_PASSWORD=<your-jwt-secret>
   NODE_ENV=production
   PORT=3000
   ```

#### Step 3: Deploy WebSocket Server
1. Create new service
2. Connect GitHub repo
3. Set root directory: `metaverse`
4. Use `railway-ws.json` config
5. Set environment variables:
   ```
   DATABASE_URL=<your-postgres-connection-string>
   JWT_PASSWORD=<your-jwt-secret>
   NODE_ENV=production
   PORT=4000
   ```

#### Step 4: Deploy Frontend
1. Create new service
2. Connect GitHub repo
3. Set root directory: `metaverse`
4. Use `railway-frontend.json` config
5. Set environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   NEXT_PUBLIC_API_URL=<your-api-url>/api/v1
   NEXT_PUBLIC_WS_URL=<your-ws-url>
   ```

---

## 🔍 **Verification Steps**

### 1. **Check Service Health**
```bash
# API Health Check
curl https://your-api-url/health

# Database connection
curl https://your-api-url/api/v1/test
```

### 2. **Check Frontend**
- Visit your frontend URL
- Check browser console for errors
- Verify API and WebSocket connections

### 3. **Check WebSocket**
- Open browser dev tools → Network → WS
- Should see WebSocket connection established

---

## 🐛 **Troubleshooting**

### Common Issues:

#### **Build Failures**
- ✅ Docker context issues → Fixed
- ✅ Package.json paths → Fixed
- Check logs for specific errors

#### **Database Connection**
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1;"
```

#### **CORS Errors**
- ✅ CORS configuration → Added to render.yaml
- Verify frontend URL is whitelisted

#### **WebSocket Connection Issues**
- Check if WebSocket service is running
- Verify WSS (secure) protocol in production
- Check firewall/proxy settings

---

## 📊 **Performance Recommendations**

### **Render.com Free Tier Limitations**
- Services spin down after 15 minutes of inactivity
- Cold start time: 30-60 seconds
- 750 hours/month limit per service

### **Production Optimizations**
1. **Upgrade to paid plans** for always-on services
2. **Use Redis** for session management (already configured)
3. **Implement health checks** for faster recovery
4. **Add monitoring** with logging services

---

## 🔐 **Security Checklist**

- [x] JWT secrets auto-generated
- [x] Database credentials secured
- [x] CORS properly configured
- [x] HTTPS enforced in production
- [x] Environment variables not hardcoded

---

## 📝 **Next Steps**

1. **Test local deployment** with Docker
2. **Deploy to Render** using blueprint
3. **Verify all services** are working
4. **Set up monitoring** and logging
5. **Configure custom domains** (optional)

---

## 🆘 **Support**

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test each service individually
4. Check network connectivity between services

The deployment configuration is now production-ready! 🎉 