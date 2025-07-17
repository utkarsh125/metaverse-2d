# Metaverse 2D - Complete Deployment Guide

A comprehensive guide for deploying the Metaverse 2D application across different platforms and environments.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Local Development](#local-development)
5. [Docker Deployment](#docker-deployment)
6. [EC2 Deployment](#ec2-deployment)
7. [Railway Deployment](#railway-deployment)
8. [Render Deployment](#render-deployment)
9. [Environment Variables](#environment-variables)
10. [Troubleshooting](#troubleshooting)
11. [Monitoring & Maintenance](#monitoring--maintenance)
12. [Cost Analysis](#cost-analysis)

## 🏗️ Project Overview

The Metaverse 2D application is a real-time 2D virtual world platform built with:

- **Frontend**: Next.js with Pixi.js for 2D rendering
- **HTTP API**: Express.js REST API
- **WebSocket Server**: Real-time communication
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis for session management
- **Containerization**: Docker with Docker Compose

### Application Ports
- **Frontend**: 3001
- **HTTP API**: 3000
- **WebSocket**: 4000
- **PostgreSQL**: 5432
- **Redis**: 6379

## 🏛️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   HTTP API      │    │  WebSocket      │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   Server        │
│   Port: 3001    │    │   Port: 3000    │    │   Port: 4000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   Port: 5432    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │     Redis       │
                    │   Port: 6379    │
                    └─────────────────┘
```

## 📋 Prerequisites

### Required Software
- **Node.js**: 18.x or higher
- **pnpm**: 9.0.0 or higher
- **Docker**: 20.x or higher
- **Docker Compose**: 2.x or higher
- **Git**: Latest version

### System Requirements
- **RAM**: Minimum 4GB, Recommended 8GB
- **Storage**: Minimum 10GB free space
- **CPU**: 2+ cores recommended

### Optional for Production
- **Domain name** (for SSL certificates)
- **Cloud provider account** (AWS, Railway, Render, etc.)

## 🚀 Local Development

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd metaverse-2d/metaverse

# Install dependencies
pnpm install

# Copy environment file
cp env.example .env

# Start development environment
./deploy.sh
```

### Manual Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start database services
docker-compose up postgres redis -d

# 3. Run database migrations
cd packages/db
npx prisma migrate deploy
npx prisma generate

# 4. Start development servers (in separate terminals)
cd apps/http && pnpm dev
cd apps/ws && pnpm dev
cd apps/frontend && pnpm dev
```

### Development URLs
- **Frontend**: http://localhost:3001
- **HTTP API**: http://localhost:3000/api/v1
- **WebSocket**: ws://localhost:4000

## 🐳 Docker Deployment

### Quick Deploy

```bash
# Navigate to project directory
cd metaverse-2d/metaverse

# Copy environment file
cp env.example .env

# Edit environment variables
nano .env

# Run deployment script
./deploy.sh
```

### Manual Docker Deployment

```bash
# Build and start all services
docker-compose up --build -d

# Wait for services to be ready
sleep 30

# Run database migrations
docker-compose exec http-api npx prisma migrate deploy

# Generate Prisma client
docker-compose exec http-api npx prisma generate
```

### Docker Commands

```bash
# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f http-api
docker-compose logs -f ws-server

# Stop services
docker-compose down

# Rebuild services
docker-compose up --build -d

# Clean up
docker system prune -a
```

## ☁️ EC2 Deployment

### Instance Setup

#### Recommended Instance Types
- **Development**: t3.medium (2 vCPU, 4GB RAM) - ~$35/month
- **Production**: t3.large (2 vCPU, 8GB RAM) - ~$70/month
- **High Performance**: c6i.large (2 vCPU, 4GB RAM) - ~$80/month

#### Security Group Configuration
```
Inbound Rules:
- SSH (22) - Your IP
- HTTP (80) - 0.0.0.0/0
- HTTPS (443) - 0.0.0.0/0
- Custom TCP (3000) - 0.0.0.0/0 (optional)
- Custom TCP (4000) - 0.0.0.0/0 (optional)
```

### Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install NGINX
sudo apt install nginx -y

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Logout and login again for Docker group
exit
# SSH back into your instance
```

### Application Deployment

```bash
# Clone repository
git clone <your-repo-url>
cd metaverse-2d/metaverse

# Create production environment
cp env.example .env
nano .env
```

#### Production Environment Configuration

```bash
# Database
DATABASE_URL="postgresql://postgres:your-secure-password@postgres:5432/metaverse?schema=public"

# Docker environment
DB_USER=postgres
DB_PASS=your-secure-password
DB_NAME=metaverse

# JWT
JWT_SECRET="your-very-secure-jwt-secret-at-least-32-characters"

# Server Configuration
NODE_ENV=production
PORT=3000

# Redis Configuration
REDIS_URL=redis://redis:6379

# Application Ports
FRONTEND_PORT=3001
HTTP_API_PORT=3000
WS_SERVER_PORT=4000

# Environment
NODE_ENV=production

# Frontend Environment Variables
NEXT_PUBLIC_API_URL=https://your-domain.com/api/v1
NEXT_PUBLIC_WS_URL=wss://your-domain.com/ws
```

### NGINX Configuration

Create `/etc/nginx/sites-available/metaverse`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # API endpoints
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket endpoint
    location /ws/ {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/health;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Performance optimizations
    client_max_body_size 10M;
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/metaverse /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### SSL Certificate

```bash
# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Deploy Application

```bash
# Build and start services
docker-compose up --build -d

# Wait for services to be ready
sleep 30

# Run database migrations
docker-compose exec http-api npx prisma migrate deploy

# Generate Prisma client
docker-compose exec http-api npx prisma generate
```

## 🚂 Railway Deployment

### Quick Setup

1. **Connect Repository**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Create Database Services**
   - Create PostgreSQL service
   - Create Redis service
   - Note connection URLs

3. **Deploy Services**

#### Frontend Service
```bash
# Create new service from GitHub repo
# Set root directory: apps/frontend
# Environment variables:
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-service.railway.app/api/v1
NEXT_PUBLIC_WS_URL=wss://your-ws-service.railway.app
```

#### HTTP API Service
```bash
# Create new service from GitHub repo
# Set root directory: apps/http
# Environment variables:
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret
DATABASE_URL=your-postgresql-url
REDIS_URL=your-redis-url
```

#### WebSocket Service
```bash
# Create new service from GitHub repo
# Set root directory: apps/ws
# Environment variables:
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret
DATABASE_URL=your-postgresql-url
REDIS_URL=your-redis-url
```

4. **Run Migrations**
```bash
# Connect to HTTP API service terminal
npx prisma migrate deploy
npx prisma generate
```

## 🎨 Render Deployment

### Database Setup

1. **Create PostgreSQL Database**
   - Go to Render Dashboard
   - Create new PostgreSQL service
   - Note connection URL

2. **Create Redis Database**
   - Create new Redis service
   - Note connection URL

### Service Deployment

#### Frontend Service
```bash
# Create new Web Service
# Build Command: cd apps/frontend && npm install && npm run build
# Start Command: cd apps/frontend && npm start
# Environment variables:
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-service.onrender.com/api/v1
NEXT_PUBLIC_WS_URL=wss://your-ws-service.onrender.com
```

#### HTTP API Service
```bash
# Create new Web Service
# Build Command: cd apps/http && npm install
# Start Command: cd apps/http && npm start
# Environment variables:
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret
DATABASE_URL=your-postgresql-url
REDIS_URL=your-redis-url
```

#### WebSocket Service
```bash
# Create new Web Service
# Build Command: cd apps/ws && npm install
# Start Command: cd apps/ws && npm start
# Environment variables:
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret
DATABASE_URL=your-postgresql-url
REDIS_URL=your-redis-url
```

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | JWT signing secret | `your-secure-secret-here` |
| `NODE_ENV` | Environment mode | `production` |
| `REDIS_URL` | Redis connection | `redis://host:6379` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API endpoint | `https://api.yourdomain.com/api/v1` |
| `NEXT_PUBLIC_WS_URL` | WebSocket endpoint | `wss://ws.yourdomain.com` |

### Docker Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_USER` | Database username | `postgres` |
| `DB_PASS` | Database password | `your-secure-password` |
| `DB_NAME` | Database name | `metaverse` |
| `FRONTEND_PORT` | Frontend port | `3001` |
| `HTTP_API_PORT` | API port | `3000` |
| `WS_SERVER_PORT` | WebSocket port | `4000` |

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check DATABASE_URL format
echo $DATABASE_URL

# Test database connection
docker-compose exec http-api npx prisma db push

# Check if PostgreSQL is running
docker-compose ps postgres
```

#### 2. WebSocket Connection Failed
```bash
# Check REDIS_URL
echo $REDIS_URL

# Test Redis connection
docker-compose exec redis redis-cli ping

# Check WebSocket logs
docker-compose logs -f ws-server
```

#### 3. Build Failures
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs
```

#### 4. NGINX Issues
```bash
# Test NGINX configuration
sudo nginx -t

# Check NGINX status
sudo systemctl status nginx

# View NGINX logs
sudo tail -f /var/log/nginx/error.log
```

#### 5. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Check SSL configuration
sudo nginx -t
```

### Debugging Commands

```bash
# View all container logs
docker-compose logs

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f http-api
docker-compose logs -f ws-server

# Check container status
docker-compose ps

# Access container shell
docker-compose exec http-api sh
docker-compose exec frontend sh

# Check environment variables
docker-compose exec http-api env | grep DATABASE
```

### Performance Issues

#### High Memory Usage
```bash
# Check memory usage
docker stats

# Restart services
docker-compose restart

# Scale down if needed
docker-compose up -d --scale frontend=1
```

#### Slow Database Queries
```bash
# Check database performance
docker-compose exec postgres psql -U postgres -d metaverse -c "SELECT * FROM pg_stat_activity;"

# Run database migrations
docker-compose exec http-api npx prisma migrate deploy
```

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Frontend health
curl http://your-domain.com/

# API health
curl http://your-domain.com/api/v1/health

# WebSocket health
curl http://your-domain.com/ws/health
```

### Log Monitoring

```bash
# Real-time logs
docker-compose logs -f

# Log rotation
sudo logrotate /etc/logrotate.d/docker-compose
```

### Backup Strategy

#### Database Backup
```bash
# Create backup
docker-compose exec postgres pg_dump -U postgres metaverse > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker-compose exec -T postgres psql -U postgres metaverse < backup_file.sql
```

#### Application Backup
```bash
# Backup configuration
cp .env .env.backup
cp docker-compose.yml docker-compose.yml.backup

# Backup data volumes
docker run --rm -v metaverse_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_data_$(date +%Y%m%d).tar.gz -C /data .
```

### Update Strategy

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d

# Run migrations
docker-compose exec http-api npx prisma migrate deploy

# Check logs
docker-compose logs -f
```

## 💰 Cost Analysis

### EC2 Costs (Monthly)

| Instance Type | Specs | Cost |
|---------------|-------|------|
| t3.medium | 2 vCPU, 4GB RAM | ~$35 |
| t3.large | 2 vCPU, 8GB RAM | ~$70 |
| c6i.large | 2 vCPU, 4GB RAM | ~$80 |

### Additional Costs
- **Storage (EBS)**: ~$5/month (50GB)
- **Data Transfer**: ~$10/month
- **Domain**: ~$1/month
- **SSL**: Free (Let's Encrypt)

### Total Monthly Costs
- **Development**: ~$40-50/month
- **Production**: ~$80-100/month
- **High Performance**: ~$100-120/month

### Cost Optimization
- **Spot Instances**: Save 60-90%
- **Reserved Instances**: Save 30-60%
- **Free Tier**: First 12 months free (t2.micro)

### Alternative Platforms
- **Railway**: $5-20/month (pay per usage)
- **Render**: $7-25/month
- **DigitalOcean**: $5-40/month
- **Heroku**: $7-25/month

## 🔄 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] SSL certificates obtained
- [ ] Domain configured
- [ ] Security groups configured
- [ ] Backup strategy in place

### Post-Deployment
- [ ] All services running
- [ ] Database migrations applied
- [ ] Health checks passing
- [ ] SSL certificates working
- [ ] Monitoring configured
- [ ] Logs being collected
- [ ] Performance acceptable

### Maintenance
- [ ] Regular backups scheduled
- [ ] Security updates applied
- [ ] Performance monitoring active
- [ ] Error rate monitoring
- [ ] Resource usage tracking
- [ ] Update strategy defined

## 📞 Support

### Getting Help
1. Check the troubleshooting section above
2. Review application logs
3. Check platform-specific documentation
4. Create an issue in the repository

### Useful Commands
```bash
# Quick status check
docker-compose ps && curl -s http://localhost:3000/health

# Full system check
docker system df && docker-compose logs --tail=50

# Emergency restart
docker-compose down && docker-compose up -d
```

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Metaverse 2D Team 