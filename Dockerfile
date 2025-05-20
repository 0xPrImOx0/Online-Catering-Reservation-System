# 1. Use the official Node 22 base image
FROM node:22.14.0

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies 
RUN npm install --legacy-peer-deps

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port from .env (3000)
EXPOSE 3000

# 7. Run as dev
CMD ["npm", "run", "dev"]