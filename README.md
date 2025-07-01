# 🚀 Dark Patterns Assessment Tool

A comprehensive tool for analyzing websites and detecting dark patterns using real-time web scraping and AI analysis.

## ✨ Features

- **Real-time Analysis**: Uses Puppeteer to scrape and analyze websites
- **Comprehensive Detection**: Identifies dark patterns, grey patterns, and positive design practices
- **Professional Reports**: Generates detailed PDF reports with recommendations
- **No Dummy Data**: Provides specific, actionable insights for each website

## 🌐 Live Demo

**Frontend**: Deployed on Netlify  
**Backend**: Deployed on Railway with Puppeteer support

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Dhivya-Bharathy/prem-product-playground-98)

## 🚀 Quick Deploy

### Option 1: One-Click Deploy
Click the "Deploy to Netlify" button above for instant deployment.

### Option 2: Manual Deploy

#### Frontend (Netlify)
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select this repository
4. Build settings (auto-configured):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variable:
   - `VITE_BACKEND_URL` = `https://prem-product-playground-98-production.up.railway.app`

#### Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. Deploy from GitHub repo
3. Select `backend` folder
4. Add environment variables:
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = `https://your-netlify-url.netlify.app`

## 🛠️ Local Development

```bash
# Install dependencies
npm install
cd backend && npm install

# Start frontend (localhost:8081)
npm run dev

# Start backend (localhost:3001)
cd backend && npm start
```

## 📋 Environment Variables

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8081
```

## 🔧 Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Puppeteer, Cheerio
- **Deployment**: Netlify (Frontend) + Railway (Backend)
- **Analysis**: Real-time web scraping with semantic pattern detection

## 📄 License

MIT License - see LICENSE file for details.
