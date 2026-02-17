# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml .npmrc tsconfig.base.json ./
COPY apps/gateway/package.json apps/gateway/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN pnpm install --filter ./packages/shared... --filter ./apps/gateway... --frozen-lockfile=false

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/apps/gateway/node_modules ./apps/gateway/node_modules
COPY . .
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN pnpm -r --filter ./packages/shared build
RUN pnpm --filter ./apps/gateway build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/gateway/node_modules ./apps/gateway/node_modules
COPY --from=build /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=build /app/packages/shared/dist ./packages/shared/dist
COPY --from=build /app/apps/gateway/package.json ./apps/gateway/package.json
COPY --from=build /app/apps/gateway/dist ./apps/gateway/dist
EXPOSE 4000
CMD ["node", "apps/gateway/dist/main.js"]

