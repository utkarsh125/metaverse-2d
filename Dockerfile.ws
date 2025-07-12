# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY metaverse/package.json metaverse/pnpm-lock.yaml metaverse/pnpm-workspace.yaml ./
COPY metaverse/apps/ws/package.json ./apps/ws/
COPY metaverse/packages/db/package.json ./packages/db/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY metaverse/ .

# Build the application
RUN pnpm --filter ws run build

# Production stage
FROM node:18-alpine AS production

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY metaverse/package.json metaverse/pnpm-lock.yaml metaverse/pnpm-workspace.yaml ./
COPY metaverse/apps/ws/package.json ./apps/ws/
COPY metaverse/packages/db/package.json ./packages/db/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from build stage
COPY --from=base /app/apps/ws/dist ./apps/ws/dist
COPY --from=base /app/packages/db/dist ./packages/db/dist

# Expose port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Start the application
CMD ["pnpm", "--filter", "ws", "start"] 