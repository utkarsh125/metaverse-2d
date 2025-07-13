# Railway Deployment Guide

## Overview
This project is a monorepo with three main services:
- **Frontend** (Next.js) - `/apps/frontend`
- **HTTP API** (Node.js/Express) - `/apps/http` 
- **WebSocket Server** (Node.js) - `/apps/ws`

## Prerequisites
1. Railway account
2. PostgreSQL database (can be created on Railway)

## Deployment Steps

### 1. Database Setup
1. Create a new PostgreSQL database service in Railway
2. Note the connection string for later use

### 2. Deploy Each Service Separately

#### Option A: Using Railway CLI (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to the metaverse directory
cd metaverse

# Deploy HTTP API
railway up --service http-api --config railway-api.json

# Deploy WebSocket Server  
railway up --service ws-server --config railway-ws.json

# Deploy Frontend
railway up --service frontend --config railway-frontend.json
```

#### Option B: Using Railway Dashboard
1. **Create HTTP API Service:**
   - Connect your GitHub repository
   - Set root directory to `metaverse`
   - Use `railway-api.json` configuration
   - Set environment variables (see below)

2. **Create WebSocket Service:**
   - Connect your GitHub repository
   - Set root directory to `metaverse`
   - Use `railway-ws.json` configuration
   - Set environment variables (see below)

3. **Create Frontend Service:**
   - Connect your GitHub repository
   - Set root directory to `metaverse`
   - Use `railway-frontend.json` configuration
   - Set environment variables (see below)

### 3. Environment Variables

#### HTTP API Service
```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_PASSWORD=your-secret-jwt-password
CORS_ORIGIN=https://your-frontend-domain.railway.app
```

#### WebSocket Service
```
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_PASSWORD=your-secret-jwt-password
CORS_ORIGIN=https://your-frontend-domain.railway.app
```

#### Frontend Service
```
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_API_URL=https://your-api-domain.railway.app/api/v1
NEXT_PUBLIC_WS_URL=wss://your-ws-domain.railway.app
```

### 4. Important Notes

- **Root Directory**: Always set the root directory to `metaverse` for all services
- **Build Context**: Railway will build from the `metaverse` directory
- **Domain URLs**: Update the environment variables with your actual Railway domain URLs
- **Database**: Make sure all services use the same DATABASE_URL
- **JWT_PASSWORD**: Use the same JWT_PASSWORD for all services

### 5. Troubleshooting

If you get "Nixpacks build failed" error:
1. Ensure you're deploying from the `metaverse` directory
2. Check that all Dockerfile paths are correct
3. Verify environment variables are set correctly
4. Make sure the database is accessible

### 6. Post-Deployment
1. Run database migrations (if needed)
2. Test all services are communicating properly
3. Update CORS origins with the actual deployed URLs

## Service URLs
After deployment, your services will be available at:
- Frontend: `https://your-frontend.railway.app`
- HTTP API: `https://your-api.railway.app`
- WebSocket: `wss://your-ws.railway.app` 