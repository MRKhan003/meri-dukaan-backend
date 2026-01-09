#!/bin/bash

echo "🚀 Setting up Meri Dukaan Backend..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start PostgreSQL
echo "🐘 Starting PostgreSQL..."
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run prisma:generate

# Run migrations
echo "📦 Running database migrations..."
npm run prisma:migrate

# Seed database
echo "🌱 Seeding database..."
npm run prisma:seed

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Run 'npm run start:dev' to start the development server"
echo "3. Default password for all users: password123"

