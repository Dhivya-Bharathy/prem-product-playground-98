# 🚀 Dark Patterns Assessment Tool

A comprehensive tool for analyzing websites and detecting dark patterns using real-time web scraping and AI analysis.

## ✨ Features

- **Real-time Analysis**: Uses Puppeteer to scrape and analyze websites
- **Comprehensive Detection**: Identifies dark patterns, grey patterns, and positive design practices
- **Professional Reports**: Generates detailed PDF reports with recommendations
- **No Dummy Data**: Provides specific, actionable insights for each website

## 🌐 Live Demo

**Frontend**: Deployed on Render  
**Backend**: Deployed on Render with Puppeteer support

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 🚀 Quick Deploy

### Option 1: Render Blueprint (Recommended)
1. Click the "Deploy to Render" button above
2. Connect your GitHub repository
3. Render will automatically detect `render.yaml` and deploy both services

### Option 2: Manual Deploy
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.



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
- **Deployment**: Render (Full-stack deployment)
- **Analysis**: Real-time web scraping with semantic pattern detection

## 📄 License

MIT License - see LICENSE file for details.
