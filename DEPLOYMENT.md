# Deployment Guide for Render

This guide will help you deploy the Prem Product Playground application to Render.

## Prerequisites

1. A Render account (free tier available)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Using render.yaml (Recommended)

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com) and sign in
   - Click "New +" and select "Blueprint"
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` file

3. **Deploy**
   - Render will create both services automatically:
     - `prem-product-playground-backend` (Node.js API)
     - `prem-product-playground-frontend` (Static site)
   - The services will be linked together with environment variables

### Option 2: Manual Deployment

#### Deploy Backend First

1. **Create Web Service**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Configure:
     - **Name**: `prem-product-playground-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

2. **Environment Variables**
   - Add these environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`

#### Deploy Frontend

1. **Create Static Site**
   - Click "New +" → "Static Site"
   - Connect your Git repository
   - Configure:
     - **Name**: `prem-product-playground-frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
     - **Plan**: Free

2. **Environment Variables**
   - Add this environment variable:
     - `VITE_BACKEND_URL`: `https://your-backend-service-name.onrender.com`

## Environment Variables

### Backend Environment Variables
- `NODE_ENV`: Set to `production`
- `PORT`: Port number (Render sets this automatically)
- `FRONTEND_URL`: URL of your frontend service

### Frontend Environment Variables
- `VITE_BACKEND_URL`: URL of your backend service

## Service URLs

After deployment, your services will be available at:
- **Frontend**: `https://prem-product-playground-frontend.onrender.com`
- **Backend**: `https://prem-product-playground-backend.onrender.com`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **CORS Errors**
   - The backend is configured to allow requests from the frontend
   - Check that `FRONTEND_URL` environment variable is set correctly

3. **API Connection Issues**
   - Verify `VITE_BACKEND_URL` is set correctly in frontend
   - Check that backend service is running and healthy

### Health Checks

- **Backend Health**: `https://your-backend-url.onrender.com/health`
- **Frontend Health**: `https://your-frontend-url.onrender.com/health`

## Monitoring

- Monitor your services in the Render dashboard
- Check logs for any errors
- Set up alerts for service downtime

## Scaling

- Free tier includes 750 hours per month
- Services sleep after 15 minutes of inactivity
- Upgrade to paid plans for always-on services

## Security

- All traffic is served over HTTPS
- Environment variables are encrypted
- CORS is properly configured
- Security headers are enabled 