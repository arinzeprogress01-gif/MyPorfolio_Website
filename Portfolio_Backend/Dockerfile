# Stage 1: Build Dependencies
FROM node:24-alpine AS dependencies

WORKDIR /app

# Copy package.json over (does not strictly require lockfile to be present)
COPY package.json ./

# Swap npm ci for npm install to bypass lockfile tracking requirements
RUN npm install --omit=dev --legacy-peer-deps

# Stage 2: Production Runtime
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Pull clean node_modules from the dependencies layer
COPY --from=dependencies /app/node_modules ./node_modules

# Copy files directly relative to the subfolder context
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
