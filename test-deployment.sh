#!/bin/bash

# Test Deployment Script for Metaverse 2D Application
# This script validates the deployment setup

echo "🚀 Testing Metaverse 2D Deployment Setup"
echo "======================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check if required files exist
required_files=(
    "docker-compose.yml"
    "Dockerfile.frontend"
    "Dockerfile.http"
    "Dockerfile.ws"
    "render.yaml"
    "metaverse/package.json"
    "metaverse/pnpm-lock.yaml"
)

echo "🔍 Checking required files..."
for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
        exit 1
    fi
done

echo "📦 All required files are present"

# Check Dockerfile structure
echo "🏗️  Checking Dockerfile structure..."

# Check if Dockerfiles have basic required components
dockerfiles=("Dockerfile.frontend" "Dockerfile.http" "Dockerfile.ws")
for dockerfile in "${dockerfiles[@]}"; do
    echo "Checking $dockerfile..."
    if grep -q "FROM.*node" "$dockerfile" && grep -q "COPY.*metaverse" "$dockerfile" && grep -q "CMD.*pnpm" "$dockerfile"; then
        echo "✅ $dockerfile has correct structure"
    else
        echo "❌ $dockerfile is missing required components"
    fi
done

# Test docker-compose configuration
echo "🐳 Testing Docker Compose configuration..."
docker-compose config > /dev/null 2>&1
if [[ $? -eq 0 ]]; then
    echo "✅ Docker Compose configuration is valid"
else
    echo "❌ Docker Compose configuration has errors"
    docker-compose config
    exit 1
fi

# Check if ports are available
echo "🔌 Checking if required ports are available..."
ports=(3000 3001 4000 5432 6379)
for port in "${ports[@]}"; do
    if lsof -i :$port > /dev/null 2>&1; then
        echo "⚠️  Port $port is already in use"
    else
        echo "✅ Port $port is available"
    fi
done

echo ""
echo "🎉 Deployment setup validation complete!"
echo ""
echo "📋 Next steps:"
echo "1. To test locally: docker-compose up -d"
echo "2. To deploy to Render: Follow the DEPLOYMENT_READY.md guide"
echo "3. To deploy to Railway: Follow the Railway section in DEPLOYMENT_READY.md"
echo ""
echo "📝 Services will be available at:"
echo "   - Frontend: http://localhost:3001"
echo "   - API: http://localhost:3000"
echo "   - WebSocket: ws://localhost:4000"
echo "   - Database: postgresql://metaverse_user:metaverse_password@localhost:5432/metaverse"
echo ""
echo "🔧 To monitor logs: docker-compose logs -f"
echo "🛑 To stop services: docker-compose down" 