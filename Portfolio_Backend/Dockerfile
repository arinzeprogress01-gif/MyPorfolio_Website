# Stage 1: Build Dependencies
FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Stage 2: Production Runtime
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Pull clean node_modules from the dependencies layer
COPY --from=dependencies /app/node_modules ./node_modules

# Copy files directly relative to the subfolder context
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
