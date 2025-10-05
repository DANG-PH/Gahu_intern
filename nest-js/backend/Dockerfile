# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build NestJS project
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Chạy app
CMD ["npm", "run", "start:prod"]