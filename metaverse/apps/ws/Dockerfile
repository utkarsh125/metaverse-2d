FROM node:22-slim

WORKDIR /app

# Install pnpm and required system dependencies
RUN npm install -g pnpm@latest
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client with correct binary targets
RUN cd packages/db && npx prisma generate

# Verify the generated client exists
RUN ls -la packages/db/src/generated/prisma/

# Build the WS service
RUN pnpm --filter apps/ws... build

# Copy Prisma client and engine binaries to expected locations
RUN mkdir -p /app/.prisma/client
RUN cp -r packages/db/src/generated/prisma/* /app/.prisma/client/

# Also copy to the pnpm location where the app expects it
RUN mkdir -p /app/node_modules/.prisma/client
RUN cp -r packages/db/src/generated/prisma/* /app/node_modules/.prisma/client/

# Copy engine binaries to the apps directory for direct access
RUN mkdir -p /app/apps/ws/.prisma/client
RUN cp -r packages/db/src/generated/prisma/* /app/apps/ws/.prisma/client/

# Set environment
ENV NODE_ENV=production

EXPOSE 4000
CMD ["node", "apps/ws/dist/index.js"]