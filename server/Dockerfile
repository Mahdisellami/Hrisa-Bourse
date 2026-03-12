# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy necessary files
COPY .env.example .env

# Create uploads directory
RUN mkdir -p uploads

# Set environment variables
ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "dist/index.js"]
