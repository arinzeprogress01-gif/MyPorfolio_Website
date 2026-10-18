FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

# 1. Since the context is already inside Portfolio_Backend, copy directly from the local root
COPY package*.json ./

# 2. Install production dependencies
RUN npm ci --omit=dev

# 3. Copy all backend files from the current context directory into /app
COPY . .

# 4. Expose the port your server listens to
EXPOSE 8080

# 5. Execute your server application
CMD ["node", "server.js"]
