# Stage 1: Build / Install dependencies
FROM node:20-alpine

WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port backend
EXPOSE 3000

# Chạy backend
CMD ["node", "index.js"]
