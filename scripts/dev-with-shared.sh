#!/bin/bash

# Development script that runs shared package in watch mode alongside other services
echo "🚀 Starting development environment with shared package hot reload..."

# Start shared package in watch mode in background
echo "📦 Building shared package..."
pnpm --filter=@mindboard/shared build &

# Wait a moment for initial build
sleep 2

# Start shared package watch mode
echo "👀 Starting shared package watch mode..."
pnpm --filter=@mindboard/shared dev &

# Start main development servers
echo "🏃 Starting development servers..."
pnpm dev

# Clean up background processes on exit
trap 'kill $(jobs -p)' EXIT