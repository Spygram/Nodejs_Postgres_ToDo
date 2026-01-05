FROM node:20.19.1-bullseye


# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./
RUN npm install

COPY . .

# Expose port from .env
EXPOSE 3000

# Start server
CMD ["node", "backend/server.js"]
