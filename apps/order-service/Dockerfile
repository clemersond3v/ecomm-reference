# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml .npmrc tsconfig.base.json ./
COPY apps/order-service/package.json apps/order-service/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN pnpm install --filter ./packages/shared... --filter ./apps/order-service... --frozen-lockfile=false

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/apps/order-service/node_modules ./apps/order-service/node_modules
COPY . .
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN pnpm -r --filter ./packages/shared build
RUN pnpm --filter ./apps/order-service build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/order-service/node_modules ./apps/order-service/node_modules
COPY --from=build /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=build /app/packages/shared/dist ./packages/shared/dist
COPY --from=build /app/apps/order-service/dist ./apps/order-service/dist
COPY --from=build /app/apps/order-service/package.json ./apps/order-service/package.json
EXPOSE 4002
CMD ["node", "apps/order-service/dist/main.js"]

