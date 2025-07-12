# Deployment Guide for Metaverse Project

This project has a nested directory structure:
```
metaverse-2d/
└── metaverse/
    ├── apps/
    │   ├── frontend/    (Next.js app) - Port 3001
    │   ├── http/        (Express API) - Port 3000
    │   └── ws/          (WebSocket server) - Port 4000
    ├── packages/
    └── Dockerfile.*
```

## Prerequisites

- PostgreSQL database
- Environment variables configured
- Domain names/URLs for cross-service communication
- Git repository connected to deployment platform

## Important: Directory Structure

Your project root should be the `metaverse-2d` directory, which contains the `metaverse` subdirectory. All deployment configurations have been set up to handle this nested structure automatically.

## Render Deployment

### 1. Repository Setup
1. Ensure your Git repository root is the `metaverse-2d` directory
2. Push your code to GitHub/GitLab
3. Connect your repository to Render

### 2. Automatic Deployment
1. Go to your Render dashboard
2. Create a new "Blueprint" deployment
3. Connect your repository
4. Render will automatically read the `render.yaml` file and deploy all services:
   - `metaverse-postgres` (PostgreSQL database)
   - `metaverse-api` (HTTP API server) 
   - `metaverse-ws` (WebSocket server)
   - `metaverse-frontend` (Next.js frontend)

### 3. Environment Variables
The following environment variables are automatically configured in `render.yaml`:
- `DATABASE_URL` (auto-generated from PostgreSQL service)
- `JWT_PASSWORD` (auto-generated secure secret)
- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL` (points to API service)
- `NEXT_PUBLIC_WS_URL` (points to WebSocket service)
- `CORS_ORIGIN` (allows frontend to access API)

### 4. Service URLs
After deployment, your services will be available at:
- Frontend: `https://metaverse-frontend.onrender.com`
- API: `https://metaverse-api.onrender.com`
- WebSocket: `wss://metaverse-ws.onrender.com`

## Railway Deployment

Railway requires deploying each service separately. You'll need to create 3 separate services:

### 1. Repository Setup
1. Ensure your Git repository root is the `metaverse-2d` directory
2. Push your code to GitHub
3. Connect your repository to Railway

### 2. Database Setup
1. Create a PostgreSQL service in Railway
2. Note the connection string from the service variables

### 3. Deploy HTTP API Service
1. Create a new service in Railway
2. Connect your GitHub repository
3. In the service settings, specify:
   - **Root Directory**: `metaverse`
   - **Build Command**: (leave empty, handled by Dockerfile)
   - **Start Command**: (leave empty, handled by Dockerfile)
4. Set environment variables:
   ```
   DATABASE_URL=<your-postgresql-connection-string>
   JWT_PASSWORD=<your-jwt-secret>
   NODE_ENV=production
   PORT=3000
   CORS_ORIGIN=<your-frontend-url>
   ```

### 4. Deploy WebSocket Service
1. Create a new service in Railway
2. Connect your GitHub repository
3. In the service settings, specify:
   - **Root Directory**: `metaverse`
   - **Build Command**: (leave empty, handled by Dockerfile)
   - **Start Command**: (leave empty, handled by Dockerfile)
4. Set environment variables:
   ```
   DATABASE_URL=<your-postgresql-connection-string>
   JWT_PASSWORD=<your-jwt-secret>
   NODE_ENV=production
   PORT=4000
   CORS_ORIGIN=<your-frontend-url>
   ```

### 5. Deploy Frontend Service
1. Create a new service in Railway
2. Connect your GitHub repository
3. In the service settings, specify:
   - **Root Directory**: `metaverse`
   - **Build Command**: (leave empty, handled by Dockerfile)
   - **Start Command**: (leave empty, handled by Dockerfile)
4. Set environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   NEXT_PUBLIC_API_URL=<your-api-service-url>/api/v1
   NEXT_PUBLIC_WS_URL=<your-websocket-service-url>
   ```

## Build Process

Each Docker container follows this build process:

1. **Set working directory** to `/app`
2. **Copy package.json files** from the `metaverse` directory
3. **Install dependencies** using pnpm
4. **Copy source code** from the `metaverse` directory
5. **Build database package** (`@metaverse/db`)
6. **Generate Prisma client** 
7. **Build the specific service** (frontend/http/ws)
8. **Run database migrations** (HTTP API service only)
9. **Start the service**

## Docker Context

The deployment configurations correctly handle the nested directory structure:
- **Docker Context**: `metaverse` (or `./metaverse`)
- **Dockerfile Path**: `metaverse/Dockerfile.*`

This means Docker will build from within the `metaverse` directory, but the build context starts from the `metaverse-2d` root.

## Troubleshooting

### Common Issues:

1. **Build Context Errors**
   - Ensure your repository root is `metaverse-2d`, not `metaverse`
   - Verify the Docker context is set correctly in configuration files
   - Check that Dockerfile paths are `metaverse/Dockerfile.*`

2. **Database Connection Errors**
   - Ensure `DATABASE_URL` is properly set
   - Check database service is running
   - Verify connection string format

3. **CORS Errors**
   - Update `CORS_ORIGIN` environment variable
   - Ensure frontend URL is whitelisted in API service

4. **Build Failures**
   - Check that all package.json files are copied correctly
   - Verify pnpm workspace configuration
   - Ensure database package builds before dependent services

5. **Port Conflicts**
   - Frontend: 3001
   - HTTP API: 3000
   - WebSocket: 4000
   - Ensure these ports are properly exposed and configured

### Directory Structure Verification:

Your repository should look like this:
```
metaverse-2d/                    ← Repository root
├── metaverse/                   ← Project root
│   ├── apps/
│   │   ├── frontend/
│   │   ├── http/
│   │   └── ws/
│   ├── packages/
│   │   └── db/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.http
│   ├── Dockerfile.ws
│   ├── render.yaml
│   └── railway*.json
└── README.md (optional)
```

### Environment Variables Checklist:

**HTTP API & WebSocket Services:**
- [ ] `DATABASE_URL`
- [ ] `JWT_PASSWORD`
- [ ] `NODE_ENV=production`
- [ ] `PORT` (3000 for API, 4000 for WS)
- [ ] `CORS_ORIGIN`

**Frontend Service:**
- [ ] `NODE_ENV=production`
- [ ] `PORT=3001`
- [ ] `NEXT_PUBLIC_API_URL`
- [ ] `NEXT_PUBLIC_WS_URL`

## Service Configuration Files

- `render.yaml` - Complete Render configuration for all services
- `railway-frontend.json` - Railway configuration for frontend
- `railway-api.json` - Railway configuration for HTTP API
- `railway-ws.json` - Railway configuration for WebSocket server
- `railway.json` - Default Railway configuration (uses frontend)

## Database Migrations

Database migrations are automatically run by the HTTP API service on startup. Ensure the HTTP API service is deployed and running before other services that depend on the database.

## Repository Setup Tips

1. **For GitHub**: Connect the `metaverse-2d` repository to your deployment platform
2. **For Render**: Use Blueprint deployment with the `render.yaml` file
3. **For Railway**: Create separate services, each pointing to the same repository but different configurations

## Monitoring

Monitor your services through:
- Render Dashboard (for Render deployments)
- Railway Dashboard (for Railway deployments)
- Application logs for debugging issues
- Health check endpoints (configured in Railway configs)

## Scaling

Both platforms support horizontal scaling. Consider scaling based on:
- Frontend: User traffic
- HTTP API: API request volume
- WebSocket: Concurrent connection count
- Database: Query load and storage requirements 