##### DEPENDENCIES
FROM oven/bun:latest AS deps

# Setup server dependencies
WORKDIR /app/server
COPY server/package.json server/bun.lock* ./
RUN bun install --frozen-lockfile

# Setup frontend dependencies
WORKDIR /app/www
COPY www/package.json www/bun.lock* ./
RUN bun install --frozen-lockfile

##### BUILDER
FROM oven/bun:latest AS builder

# Build server
WORKDIR /app/server
COPY --from=deps /app/server/node_modules ./node_modules
COPY server .
RUN bun run build

# Build frontend
WORKDIR /app/www
COPY --from=deps /app/www/node_modules ./node_modules
COPY www .
ENV NEXT_PUBLIC_API_URL=/api
RUN bun run build

##### RUNNER
FROM oven/bun:slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy server build
COPY --from=builder /app/server/build ./server/build
COPY --from=builder /app/server/package.json ./server/
COPY --from=builder /app/server/node_modules ./server/node_modules

# Copy frontend build
COPY --from=builder /app/www/.next ./www/.next
COPY --from=builder /app/www/public ./www/public
COPY --from=builder /app/www/package.json ./www/
COPY --from=builder /app/www/next.config.ts ./www/
COPY --from=builder /app/www/env.ts ./www/
COPY --from=builder /app/www/node_modules ./www/node_modules

# Add start script
COPY scripts/start.sh /app/
RUN chmod +x /app/start.sh

# Expose ports
EXPOSE 3000
EXPOSE 3001

# Start both applications
CMD ["/app/start.sh"]
