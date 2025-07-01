# 🚀 Deployment Guide

This guide will help you deploy the Dark Patterns Assessment tool with a fully working backend.

## 📋 Overview

- **Frontend**: React/Vite app → Deploy to **Netlify**
- **Backend**: Node.js + Puppeteer → Deploy to **Railway**

## 🔧 Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your GitHub account

### 1.2 Deploy Backend
1. Click "New Project" → "Deploy from GitHub repo"
2. Select your repository: `prem-product-playground-98`
3. Choose "Deploy from a folder" → Select `backend` folder
4. Railway will automatically detect it's a Node.js app

### 1.3 Configure Environment Variables
In Railway dashboard, go to your service → Variables tab and add:

```
NODE_ENV=production
FRONTEND_URL=https://your-app-name.netlify.app
```

### 1.4 Get Your Railway URL
- After deployment, Railway will give you a URL like: `https://your-app-name.railway.app`
- **Save this URL** - you'll need it for the frontend!

## 🌐 Step 2: Deploy Frontend to Netlify

### 2.1 Create Netlify Account
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub

### 2.2 Deploy Frontend
1. Click "New site from Git"
2. Choose GitHub → Select your repository
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `/` (leave empty)

### 2.3 Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables, add:

```
VITE_BACKEND_URL=https://your-railway-app.railway.app
```

**Replace with your actual Railway URL from Step 1.4!**

### 2.4 Redeploy
- Go to Deploys tab → Click "Trigger deploy"
- This ensures the environment variable takes effect

## 🔄 Step 3: Update Railway with Netlify URL

1. Go back to Railway dashboard
2. Update the `FRONTEND_URL` variable with your Netlify URL:
   ```
   FRONTEND_URL=https://your-app-name.netlify.app
   ```
3. This will restart your backend with proper CORS

## ✅ Step 4: Test Your Deployment

1. Visit your Netlify URL
2. Go to "Dark Patterns Assessment" tool
3. Enter any website URL and analyze
4. You should see **specific pattern names**, not generic text!

## 🐛 Troubleshooting

### Backend Issues:
- **503 Error**: Railway might need a few minutes to start
- **CORS Error**: Make sure `FRONTEND_URL` is set correctly in Railway
- **Timeout**: Puppeteer needs time to scrape websites

### Frontend Issues:
- **API Connection Failed**: Check `VITE_BACKEND_URL` in Netlify
- **Build Failed**: Make sure all dependencies are in `package.json`

## 🔗 URLs You'll Get:

```
Frontend: https://your-app-name.netlify.app
Backend:  https://your-app-name.railway.app
API:      https://your-app-name.railway.app/api/analyze
Health:   https://your-app-name.railway.app/health
```

## 💰 Costs:

- **Netlify**: Free (generous limits)
- **Railway**: Free tier available (500 hours/month)

## 🎉 You're Done!

Your Dark Patterns Assessment tool is now live with:
- ✅ Real web scraping with Puppeteer
- ✅ Actual dark pattern detection  
- ✅ Specific, detailed analysis results
- ✅ No more dummy data!

---

**Need help?** Check the Railway and Netlify logs in their dashboards for detailed error messages. 