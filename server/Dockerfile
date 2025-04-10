# Use the official Bun image as the base image
FROM oven/bun

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
COPY bun.lock ./
RUN bun install

# Copy the rest of the application code (excluding .env files via .dockerignore)
COPY . .

# Build the application
RUN bun run build

# Expose the port from env var with fallback
EXPOSE 3001

# Start the application
CMD ["bun", "run", "start"]