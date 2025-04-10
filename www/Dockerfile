FROM oven/bun

WORKDIR /app

COPY package.json tsconfig.json next.config.ts postcss.config.mjs env.ts ./
COPY src ./src

RUN bun install

CMD ["sh", "-c", "bun run build && bun run start"]
