# Step 1: base image for building the app
FROM node:22-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies required for Prisma
RUN apt-get update && apt-get install -y openssl curl && rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

# Copy the whole monorepo into the container
COPY . .

# Install dependencies (with all shared packages)
RUN pnpm install --frozen-lockfile

# Generate Prisma Client in the db package
RUN pnpm --filter packages/db generate

# Build the target app only
RUN pnpm --filter apps/http... build

# --- Runtime image ---
FROM node:22-slim as runner
WORKDIR /app

# Copy only the built HTTP app from builder
COPY --from=builder /app/apps/http/dist ./apps/http/dist

# Optional: If running via built file
COPY --from=builder /app/apps/http/package.json ./apps/http/
COPY --from=builder /app/apps/http/tsconfig.json ./apps/http/

# Copy shared database code and prisma client
COPY --from=builder /app/packages/db /app/packages/db

# Copy node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/http/node_modules ./apps/http/node_modules

# Copy .prisma/client to allow Prisma to run post-build
COPY --from=builder /app/packages/db/node_modules/.prisma /app/node_modules/.prisma

# Set NODE_ENV and PORT
ENV NODE_ENV=production
ENV PORT=3000

# Health check (optional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/health || exit 1

EXPOSE $PORT

# Run the HTTP server
CMD ["node", "apps/http/dist/index.js"]
