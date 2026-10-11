# Stage 1: Build Dependencies
FROM node:24-alpine AS dependencies

WORKDIR /app

# Copies package.json and package-lock.json explicitly
COPY package*.json ./

# Added the legacy-peer-deps flag to prevent strict npm version mismatch crashes
RUN npm ci --legacy-peer-deps

# Stage 2: Production Runtime
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Pull clean node_modules from the dependencies layer
COPY --from=dependencies /app/node_modules ./node_modules

# Copy files directly relative to the subfolder context
COPY . .

EXPOSE 8080

# Optimized: Running node directly ensures Render can boot and shut down the container cleanly
CMD ["node", "server.js"] 
