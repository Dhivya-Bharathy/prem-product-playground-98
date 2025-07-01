#!/bin/bash

echo "🚀 Preparing for deployment..."
echo

echo "📝 Adding all changes to git..."
git add .

echo
echo "💾 Committing changes..."
git commit -m "✨ Add deployment configuration for Railway and Netlify

- Add Railway config for backend deployment
- Add Netlify config for frontend deployment  
- Update CORS for production
- Add comprehensive deployment guide
- Ready for full deployment with working backend"

echo
echo "📤 Pushing to GitHub..."
git push origin main

echo
echo "✅ Deployment files ready!"
echo
echo "🔗 Next steps:"
echo "1. Go to https://railway.app and deploy backend"
echo "2. Go to https://netlify.com and deploy frontend"  
echo "3. Follow DEPLOYMENT.md guide for details"
echo 