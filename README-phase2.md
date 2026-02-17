# Fase 2 (Sprint 1) — Implementação Foundation (Monorepo)

Este pacote adiciona a estrutura de monorepo e o esqueleto inicial de:
- `apps/web` (Next.js)
- `apps/gateway` (NestJS + GraphQL)
- `apps/catalog-service` (NestJS REST)
- `apps/order-service` (NestJS REST)
- `packages/shared` (logger/correlation + utils)

> Você já tem a pasta `docs/` no repositório. Este ZIP **não** inclui seus docs; a ideia é **mesclar** estes arquivos na raiz do seu repo existente.

## Pré-requisitos
- Node.js 20+
- pnpm 9+
- Docker + Docker Compose

## Passo a passo (local)
1) Copie/mescle os arquivos do ZIP para a raiz do seu repositório `ecomm-reference/`.
2) Instale dependências:
   - `pnpm install`
3) Suba tudo com Docker Compose:
   - `pnpm dev:compose`

## URLs (dev)
- Web (Next): http://localhost:3000
- Gateway GraphQL: http://localhost:4000/graphql
- Catalog REST: http://localhost:4001
- Order REST: http://localhost:4002
