FROM node:20-alpine

WORKDIR /app

# Configure npm for faster installs
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 3 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps --prefer-offline --no-audit

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

# Create storage directory
RUN mkdir -p /app/storage/invoices

# Expose port (Railway uses PORT env var)
EXPOSE ${PORT:-3001}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:${PORT:-3001}/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["npm", "run", "start:prod"]

# Build version: 1768049653
