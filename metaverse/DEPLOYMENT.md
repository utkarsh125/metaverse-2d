# Metaverse 2D Deployment Guide

## Quick Start (Docker Compose)

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB RAM available

### 1. Setup
```bash
cd metaverse
cp env.example .env
# Edit .env with your production values
```

### 2. Deploy
```bash
./deploy.sh
```

### 3. Access
- Frontend: http://localhost:3001
- API: http://localhost:3000
- WebSocket: ws://localhost:4000

## Manual Deployment

### Local Development
```bash
# Install dependencies
pnpm install

# Start database
docker-compose up postgres redis -d

# Run migrations
cd packages/db
npx prisma migrate deploy
npx prisma generate

# Start services (in separate terminals)
cd apps/http && pnpm dev
cd apps/ws && pnpm dev  
cd apps/frontend && pnpm dev
```

### Production
```bash
# Build all services
pnpm build

# Start services
cd apps/http && pnpm start
cd apps/ws && pnpm start
cd apps/frontend && pnpm start
```

## Cloud Deployment Options

### Railway
1. Connect GitHub repo
2. Add environment variables
3. Deploy each service separately

### Render
1. Create PostgreSQL and Redis
2. Deploy each service as web service
3. Configure environment variables

### DigitalOcean App Platform
1. Connect repository
2. Add managed databases
3. Configure build settings

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for JWT tokens |
| `REDIS_URL` | Redis connection string |
| `NODE_ENV` | Environment mode |
| `NEXT_PUBLIC_API_URL` | Frontend API URL |
| `NEXT_PUBLIC_WS_URL` | Frontend WebSocket URL |

## Troubleshooting

### Common Issues
1. **Database Connection Failed**
   - Check DATABASE_URL
   - Ensure PostgreSQL is running

2. **WebSocket Connection Failed**
   - Check REDIS_URL
   - Ensure Redis is running

3. **Build Failures**
   - Clear Docker cache: `docker system prune`
   - Rebuild: `docker-compose build --no-cache`

### Logs
```bash
# View all logs
docker-compose logs

# View specific service
docker-compose logs -f http-api
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] Domain configured
- [ ] Monitoring set up
- [ ] Backups configured 