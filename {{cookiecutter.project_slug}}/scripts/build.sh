#!/bin/bash

# Exit in case of error
set -e

# Detect docker compose command (supports both old and new syntax)
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo "Error: Neither 'docker-compose' nor 'docker compose' is available"
    exit 1
fi

echo "Using: $DOCKER_COMPOSE"

# Build and run containers
echo "Building and starting containers..."
$DOCKER_COMPOSE up -d --build

# Wait for postgres to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 10

# Run migrations
echo "Running database migrations..."
$DOCKER_COMPOSE exec -T backend alembic upgrade head

# Create initial data
echo "Creating initial data..."
$DOCKER_COMPOSE exec -T backend python app/initial_data.py

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "🌐 Access your application:"
echo "  - Frontend: http://localhost:{{cookiecutter.port}}"
echo "  - API Docs: http://localhost:{{cookiecutter.port}}/api/docs"
echo "  - Admin: http://localhost:{{cookiecutter.port}}/admin"
echo "  - SQLPage: http://localhost:{{cookiecutter.port}}/sqlpage"
echo "  - Flower: http://localhost:5555"
echo "  - pgAdmin: http://localhost:{{cookiecutter.pgadmin_port}}"
