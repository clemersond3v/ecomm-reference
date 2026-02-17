# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml .npmrc tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN pnpm install --filter ./packages/shared... --filter ./apps/web... --frozen-lockfile=false

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN pnpm --filter ./apps/web build

FROM node:20-alpine AS runner
WORKDIR /app/apps/web
ENV NODE_ENV=production
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/apps/web/node_modules ./node_modules
COPY --from=build /app/apps/web/.next ./.next
COPY --from=build /app/apps/web/package.json ./package.json
COPY --from=build /app/apps/web/next.config.mjs ./next.config.mjs
COPY --from=build /app/apps/web/public ./public
EXPOSE 3000
CMD ["node_modules/.bin/next", "start", "-p", "3000"]


