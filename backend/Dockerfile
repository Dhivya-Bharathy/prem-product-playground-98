# Use the official Node.js 18 image
FROM node:18-slim

# Install Chromium and dependencies
RUN apt-get update && \
    apt-get install -y chromium chromium-driver fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port (Render sets $PORT)
EXPOSE 3001

# Start the server
CMD ["npm", "start"] 