#!/bin/bash

# Render Deployment Script for Prem Product Playground
# This script helps prepare and deploy the application to Render

echo "🚀 Preparing deployment to Render..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-repo-url>"
    exit 1
fi

# Check if we have uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for Render deployment'"
    exit 1
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your remote repository:"
    echo "   git remote add origin <your-repo-url>"
    exit 1
fi

echo "✅ Git repository is ready"

# Push to remote
echo "📤 Pushing to remote repository..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed successfully!"
    echo ""
    echo "🎉 Next steps:"
    echo "1. Go to https://render.com and sign in"
    echo "2. Click 'New +' and select 'Blueprint'"
    echo "3. Connect your Git repository"
    echo "4. Render will automatically detect render.yaml and deploy both services"
    echo ""
    echo "📋 Your services will be available at:"
    echo "   Frontend: https://prem-product-playground-frontend.onrender.com"
    echo "   Backend:  https://prem-product-playground-backend.onrender.com"
    echo ""
    echo "🔍 Monitor deployment in the Render dashboard"
else
    echo "❌ Failed to push to remote repository"
    exit 1
fi 