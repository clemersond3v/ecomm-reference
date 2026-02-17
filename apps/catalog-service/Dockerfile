# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml .npmrc tsconfig.base.json ./
COPY apps/catalog-service/package.json apps/catalog-service/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN pnpm install --filter ./packages/shared... --filter ./apps/catalog-service... --frozen-lockfile=false

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/apps/catalog-service/node_modules ./apps/catalog-service/node_modules
COPY . .
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN pnpm -r --filter ./packages/shared build
RUN pnpm --filter ./apps/catalog-service build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/catalog-service/node_modules ./apps/catalog-service/node_modules
COPY --from=build /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=build /app/packages/shared/dist ./packages/shared/dist
COPY --from=build /app/apps/catalog-service/dist ./apps/catalog-service/dist
COPY --from=build /app/apps/catalog-service/package.json ./apps/catalog-service/package.json
EXPOSE 4001
CMD ["node", "apps/catalog-service/dist/main.js"]


