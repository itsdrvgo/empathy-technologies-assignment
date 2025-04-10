FROM oven/bun:latest

WORKDIR /app

COPY package.json tsconfig.json ./
COPY src ./src
COPY build.ts ./build.ts

RUN bun install
RUN bun run build.ts

EXPOSE 3001

CMD ["bun", "run", "build/app.js"]
