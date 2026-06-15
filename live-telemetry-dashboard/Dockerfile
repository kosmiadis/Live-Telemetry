FROM docker.io/library/node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV CI=true

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]