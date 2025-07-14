FROM node:22-slim

WORKDIR /app

# Install pnpm and required system dependencies
RUN npm install -g pnpm@latest
RUN apt-get update -y && apt-get install -y openssl ca-certificates curl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client with correct binary targets
RUN cd packages/db && npx prisma generate

# Build the HTTP API service
RUN pnpm --filter apps/http... build

# Copy Prisma client and engine binaries to expected locations
RUN mkdir -p /app/.prisma/client
RUN cp -r packages/db/src/generated/prisma/* /app/.prisma/client/

# Also copy to the pnpm location where the app expects it
RUN mkdir -p /app/node_modules/.prisma/client
RUN cp -r packages/db/src/generated/prisma/* /app/node_modules/.prisma/client/

# Copy engine binaries to the apps directory for direct access
RUN mkdir -p /app/apps/http/.prisma/client
RUN cp -r packages/db/src/generated/prisma/* /app/apps/http/.prisma/client/

# Set environment
ENV NODE_ENV=production

# Railway uses $PORT environment variable
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/health || exit 1

EXPOSE $PORT
CMD ["node", "apps/http/dist/index.js"] 