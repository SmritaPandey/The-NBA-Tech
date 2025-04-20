#!/bin/bash

# NBA Tech Website Deployment Script

echo "Starting deployment process for NBA Tech website..."

# Step 1: Build the application
echo "Building the application..."
npm run build

# Step 2: Prepare the deployment directory
echo "Preparing deployment directory..."
mkdir -p dist
cp -r .next dist/
cp -r public dist/
cp package.json dist/
cp next.config.js dist/

# Step 3: Install production dependencies in the dist folder
echo "Installing production dependencies..."
cd dist
npm install --production --legacy-peer-deps

# Step 4: Create a deployment package
echo "Creating deployment package..."
cd ..
tar -czf nba-tech-website.tar.gz dist/

echo "Deployment package created: nba-tech-website.tar.gz"
echo "Deployment preparation completed successfully!"

# Instructions for deployment
echo ""
echo "=== Deployment Instructions ==="
echo "1. Upload nba-tech-website.tar.gz to your server"
echo "2. Extract the package: tar -xzf nba-tech-website.tar.gz"
echo "3. Navigate to the dist directory: cd dist"
echo "4. Start the server: npm start"
echo ""
echo "For production deployment with PM2:"
echo "pm2 start npm --name \"nba-tech\" -- start"
echo ""
