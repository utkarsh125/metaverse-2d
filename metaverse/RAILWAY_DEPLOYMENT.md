# Railway Deployment Guide for Metaverse 2D

This guide covers deploying your Metaverse 2D project on Railway.

## 🚀 Quick Deploy

### 1. Prerequisites
- Railway account (https://railway.app)
- GitHub repository connected to Railway
- PostgreSQL and Redis databases

### 2. Setup Databases

#### PostgreSQL Database
1. Create a new PostgreSQL service in Railway
2. Note the connection URL
3. Add to environment variables as `DATABASE_URL`

#### Redis Database
1. Create a new Redis service in Railway
2. Note the connection URL
3. Add to environment variables as `REDIS_URL`

### 3. Deploy Services

#### Frontend Service
1. Create new service from GitHub repo
2. Set root directory to `apps/frontend`
3. Use Dockerfile deployment
4. Add environment variables:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://your-api-service.railway.app/api/v1
   NEXT_PUBLIC_WS_URL=wss://your-ws-service.railway.app
   ```

#### HTTP API Service
1. Create new service from GitHub repo
2. Set root directory to `apps/http`
3. Use Dockerfile deployment
4. Add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your-secure-jwt-secret
   DATABASE_URL=your-postgresql-url
   REDIS_URL=your-redis-url
   ```

#### WebSocket Service
1. Create new service from GitHub repo
2. Set root directory to `apps/ws`
3. Use Dockerfile deployment
4. Add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your-secure-jwt-secret
   DATABASE_URL=your-postgresql-url
   REDIS_URL=your-redis-url
   ```

### 4. Run Database Migrations

After all services are deployed:

1. Connect to your HTTP API service terminal
2. Run migrations:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

## 🔧 Manual Setup

### Step 1: Create Railway Project

1. Go to Railway Dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository

### Step 2: Add Database Services

#### PostgreSQL
1. Click "New Service" → "Database" → "PostgreSQL"
2. Copy the connection URL
3. Add to environment variables as `DATABASE_URL`

#### Redis
1. Click "New Service" → "Database" → "Redis"
2. Copy the connection URL
3. Add to environment variables as `REDIS_URL`

### Step 3: Deploy Application Services

#### Frontend Service
1. Click "New Service" → "GitHub Repo"
2. Select your repository
3. Set variables:
   - `ROOT_DIRECTORY`: `apps/frontend`
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_API_URL`: `https://your-api-service.railway.app/api/v1`
   - `NEXT_PUBLIC_WS_URL`: `wss://your-ws-service.railway.app`

#### HTTP API Service
1. Click "New Service" → "GitHub Repo"
2. Select your repository
3. Set variables:
   - `ROOT_DIRECTORY`: `apps/http`
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: Generate a secure secret
   - `DATABASE_URL`: Your PostgreSQL URL
   - `REDIS_URL`: Your Redis URL

#### WebSocket Service
1. Click "New Service" → "GitHub Repo"
2. Select your repository
3. Set variables:
   - `ROOT_DIRECTORY`: `apps/ws`
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: Same as HTTP API
   - `DATABASE_URL`: Your PostgreSQL URL
   - `REDIS_URL`: Your Redis URL

### Step 4: Configure Domains

1. Go to each service settings
2. Add custom domains or use Railway domains
3. Update environment variables with new URLs

## 🔒 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis connection | `redis://host:6379` |
| `JWT_SECRET` | JWT signing secret | `your-secure-secret-here` |
| `NODE_ENV` | Environment mode | `production` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API endpoint | `https://api.railway.app/api/v1` |
| `NEXT_PUBLIC_WS_URL` | WebSocket endpoint | `wss://ws.railway.app` |

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Railway logs for build errors
   - Ensure all dependencies are in package.json
   - Verify Dockerfile paths

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check if database is accessible
   - Ensure migrations are run

3. **WebSocket Connection Issues**
   - Verify REDIS_URL format
   - Check WebSocket service logs
   - Ensure CORS is configured

4. **Environment Variable Issues**
   - Check variable names (case-sensitive)
   - Verify URLs are correct
   - Ensure secrets are properly set

5. **Frontend Standalone Build Issues**
   - Ensure `output: 'standalone'` is set in next.config.ts
   - Check that the .next/standalone directory exists after build
   - Verify the Dockerfile copies the correct standalone structure

### Debugging Commands

```bash
# View service logs
railway logs

# Connect to service shell
railway shell

# Check environment variables
railway variables

# Run migrations
railway run npx prisma migrate deploy
```

### Docker Build Testing

Test your Docker builds locally before deploying:

```bash
# Test frontend build
docker build -f apps/frontend/Dockerfile -t frontend-test .

# Test HTTP API build
docker build -f apps/http/Dockerfile -t http-api-test .

# Test WebSocket build
docker build -f apps/ws/Dockerfile -t ws-server-test .
```

## 📊 Monitoring

### Health Checks
- Frontend: `https://your-frontend.railway.app/`
- API: `https://your-api.railway.app/health`
- WebSocket: `https://your-ws.railway.app/health`

### Logs
- View real-time logs in Railway dashboard
- Set up log aggregation for production
- Monitor error rates and response times

## 🔄 Updates

### Deploying Updates
1. Push changes to GitHub
2. Railway automatically rebuilds and deploys
3. Check logs for any issues
4. Run migrations if needed

### Database Migrations
```bash
# Connect to API service
railway shell

# Run migrations
npx prisma migrate deploy
npx prisma generate
```

## 💰 Cost Optimization

### Railway Pricing
- Free tier: $5/month credit
- Pay-as-you-go for additional usage
- Database and compute costs

### Optimization Tips
- Use Railway's free tier efficiently
- Monitor resource usage
- Scale down during low traffic
- Use connection pooling for databases

## 🎯 Production Checklist

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Custom domains configured
- [ ] SSL certificates active
- [ ] Health checks passing
- [ ] Monitoring set up
- [ ] Error logging configured
- [ ] Performance monitoring active

## ✅ Docker Build Fixes Applied

The following fixes have been applied to ensure Railway compatibility:

1. **Port Configuration**: All Dockerfiles now use `$PORT` environment variable
2. **Health Checks**: Added health check endpoints to all services
3. **Standalone Output**: Fixed Next.js standalone build structure
4. **Dependencies**: Added required packages for health checks
5. **Railway Config**: Added railway.json files for each service

All Docker builds have been tested and are working correctly. 