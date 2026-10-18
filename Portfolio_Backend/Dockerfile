FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

# 1. Pull the package files specifically from your backend folder
COPY Portfolio_Backend/package*.json ./

# 2. Install production dependencies
RUN npm ci --omit=dev

# 3. Copy the backend code into the container's working directory
COPY Portfolio_Backend/ .

# 4. Render maps the public port automatically, but it helps to expose it internally
EXPOSE 8080

# 5. FIXED CMD: Executes server.js now that it is copied into the /app root folder
CMD ["node", "server.js"]
