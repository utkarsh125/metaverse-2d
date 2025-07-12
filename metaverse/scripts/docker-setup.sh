#!/bin/bash

# Docker setup script for Metaverse application
set -e

echo "🚀 Setting up Metaverse Docker environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Function to wait for database to be ready
wait_for_db() {
    echo "⏳ Waiting for PostgreSQL to be ready..."
    until docker exec metaverse-postgres pg_isready -U metaverse_user -d metaverse > /dev/null 2>&1; do
        sleep 2
    done
    echo "✅ PostgreSQL is ready!"
}

# Function to run database migrations
run_migrations() {
    echo "🔄 Running database migrations..."
    docker exec metaverse-http-api npx prisma migrate deploy
    echo "✅ Database migrations completed!"
}

# Function to seed database (if seed script exists)
seed_database() {
    if [ -f "scripts/seed-data.js" ]; then
        echo "🌱 Seeding database..."
        docker exec metaverse-http-api node scripts/seed-data.js
        echo "✅ Database seeded!"
    else
        echo "ℹ️  No seed script found, skipping database seeding."
    fi
}

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up -d --build

# Wait for database to be ready
wait_for_db

# Run migrations
run_migrations

# Seed database
seed_database

echo "🎉 Metaverse application is ready!"
echo ""
echo "📱 Frontend: http://localhost:3001"
echo "🔌 HTTP API: http://localhost:3000"
echo "🌐 WebSocket: ws://localhost:4000"
echo "🗄️  Database: localhost:5432"
echo "🔴 Redis: localhost:6379"
echo ""
echo "📋 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart services: docker-compose restart"
echo "  - Rebuild: docker-compose up -d --build" 