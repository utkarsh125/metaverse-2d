# Docker Setup for Metaverse Application

This guide will help you set up and run the Metaverse application using Docker.

## 🏗️ Architecture

The application consists of the following services:

- **Frontend**: Next.js application (port 3001)
- **HTTP API**: Express.js server (port 3000)
- **WebSocket Server**: WebSocket server (port 4000)
- **PostgreSQL**: Database (port 5432)
- **Redis**: Cache and session storage (port 6379)

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- At least 4GB of available RAM
- Ports 3000, 3001, 4000, 5432, and 6379 available

### Option 1: Automated Setup (Recommended)

Run the setup script to automatically build, start, and configure all services:

```bash
./scripts/docker-setup.sh
```

### Option 2: Manual Setup

1. **Start all services:**
   ```bash
   docker-compose up -d --build
   ```

2. **Wait for database to be ready and run migrations:**
   ```bash
   # Wait for PostgreSQL to be ready
   docker exec metaverse-postgres pg_isready -U metaverse_user -d metaverse
   
   # Run database migrations
   docker exec metaverse-http-api npx prisma migrate deploy
   ```

3. **Seed the database (optional):**
   ```bash
   docker exec metaverse-http-api node scripts/seed-data.js
   ```

## 🌐 Accessing the Application

Once all services are running, you can access:

- **Frontend**: http://localhost:3001
- **HTTP API**: http://localhost:3000/api/v1
- **WebSocket**: ws://localhost:4000
- **Database**: localhost:5432 (metaverse_user/metaverse_password)
- **Redis**: localhost:6379

## 🛠️ Development Setup

For development, you can use the development compose file which only starts the database and Redis:

```bash
# Start only database and Redis
docker-compose -f docker-compose.dev.yml up -d

# Run your applications locally
pnpm dev
```

## 📋 Useful Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f http-api
docker-compose logs -f ws-server
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ This will delete all data)
docker-compose down -v
```

### Restart Services
```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart frontend
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build frontend
```

### Database Operations
```bash
# Access PostgreSQL shell
docker exec -it metaverse-postgres psql -U metaverse_user -d metaverse

# Run Prisma migrations
docker exec metaverse-http-api npx prisma migrate deploy

# Generate Prisma client
docker exec metaverse-http-api npx prisma generate

# Reset database
docker exec metaverse-http-api npx prisma migrate reset
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_PASSWORD`: Secret for JWT token signing
- `REDIS_URL`: Redis connection string
- `NODE_ENV`: Environment (production/development)
- `PORT`: Service port

### Database Configuration

- **Database**: metaverse
- **User**: metaverse_user
- **Password**: metaverse_password
- **Port**: 5432

### Redis Configuration

- **Port**: 6379
- **No authentication required** (development setup)

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 3001, 4000, 5432, and 6379 are available
2. **Database connection issues**: Wait for PostgreSQL to be ready before running migrations
3. **Build failures**: Clear Docker cache with `docker system prune -a`

### Reset Everything

To completely reset the environment:

```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker rmi $(docker images -q metaverse_*)

# Start fresh
./scripts/docker-setup.sh
```

### Check Service Status

```bash
# Check if all services are running
docker-compose ps

# Check service health
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
```

## 📁 File Structure

```
metaverse/
├── Dockerfile.frontend      # Frontend Dockerfile
├── Dockerfile.http          # HTTP API Dockerfile
├── Dockerfile.ws            # WebSocket Dockerfile
├── docker-compose.yml       # Production compose file
├── docker-compose.dev.yml   # Development compose file
├── .dockerignore           # Docker ignore file
├── scripts/
│   └── docker-setup.sh     # Setup script
└── README-Docker.md        # This file
```

## 🔒 Security Notes

- The JWT password is hardcoded in the config files. In production, use environment variables
- Database credentials are exposed in the compose file. Use secrets management in production
- Redis has no authentication. Add authentication for production use

## 🚀 Production Deployment

For production deployment:

1. Use environment variables for all secrets
2. Add proper authentication to Redis
3. Use a reverse proxy (nginx) for the frontend
4. Set up proper SSL certificates
5. Configure database backups
6. Use Docker secrets for sensitive data
7. Set up monitoring and logging

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify all services are running: `docker-compose ps`
3. Check database connectivity: `docker exec metaverse-postgres pg_isready`
4. Restart services: `docker-compose restart` 