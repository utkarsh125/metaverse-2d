# Metaverse 2D Application

A 2D metaverse application built with Next.js, Express.js, WebSocket, and PostgreSQL.

## 🏗️ Architecture

This monorepo contains:
- `apps/frontend` - Next.js frontend application
- `apps/http` - Express.js HTTP API server
- `apps/ws` - WebSocket server for real-time communication
- `apps/temp` - Temporary release frontend (will be removed)
- `packages/db` - Shared database package with Prisma

## 🚀 Quick Start

### Option 1: Docker (Recommended)

The easiest way to run the application is using Docker:

```bash
# Clone the repository
git clone <repository-url>
cd metaverse

# Run the automated setup script
./scripts/docker-setup.sh
```

This will:
- Build and start all services (Frontend, HTTP API, WebSocket, PostgreSQL, Redis)
- Run database migrations
- Seed the database (if seed script exists)

Access the application at:
- **Frontend**: http://localhost:3001
- **HTTP API**: http://localhost:3000/api/v1
- **WebSocket**: ws://localhost:4000

For detailed Docker documentation, see [README-Docker.md](README-Docker.md).

### Option 2: Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up the database:**
   ```bash
   # Start PostgreSQL and Redis
   docker-compose -f docker-compose.dev.yml up -d
   
   # Run database migrations
   pnpm --filter db run build
   npx prisma migrate deploy
   ```

3. **Start the development servers:**
   ```bash
   pnpm dev
   ```

## 📋 Current Features

- 2D tilemap-based metaverse spaces
- Real-time user interactions via WebSocket
- User authentication and authorization
- Team invites and collaboration
- Custom elements and collision detection
- Responsive frontend with Pixi.js rendering

## 🔮 Upcoming Features

- WebRTC integration
- 4x2 Spritesheet or better sprite system
- Scalability improvements
- Enhanced real-time features

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 9.0.0+
- PostgreSQL
- Redis (optional, for WebSocket sessions)

### Available Scripts

```bash
# Build all packages
pnpm build

# Start development servers
pnpm dev

# Run linting
pnpm lint

# Format code
pnpm format

# Type checking
pnpm check-types
```

### Database Management

```bash
# Generate Prisma client
pnpm --filter db run build

# Run migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Seed database
node scripts/seed-data.js
```

## 📁 Project Structure

```
metaverse/
├── apps/
│   ├── frontend/          # Next.js frontend
│   ├── http/             # Express.js API
│   ├── ws/               # WebSocket server
│   └── temp/             # Temporary frontend
├── packages/
│   ├── db/               # Database package
│   ├── eslint-config/    # Shared ESLint config
│   ├── typescript-config/ # Shared TypeScript config
│   └── ui/               # Shared UI components
├── scripts/              # Build and utility scripts
└── docker-compose.yml    # Docker orchestration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 