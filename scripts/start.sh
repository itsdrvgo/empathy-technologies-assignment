#!/bin/sh

# Start the backend
cd /app/server && bun run build/app.js &
BACKEND_PID=$!

# Start the frontend
cd /app/www && bun run start &
FRONTEND_PID=$!

# Wait for all processes to finish
wait

# Exit with status 0
exit 0
