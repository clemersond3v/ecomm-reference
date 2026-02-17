# ADR-001 — Monorepo com Workspaces

- **Status:** proposed
- **Data:** 2026-02-16

## Contexto
Vamos construir front (Next.js), gateway GraphQL e vários serviços (NestJS) com libs compartilhadas.
Precisamos de consistência de padrões, tipos e automação.

## Decisão
Adotar **monorepo** com workspaces (pnpm ou npm workspaces), organizando em `apps/` e `packages/`.

## Alternativas consideradas
1) Multirepo (um repositório por serviço)  
2) Monorepo

## Consequências
**Prós**
- Padronização (lint/tsconfig/CI) central
- Reuso de `packages/shared` e `packages/contracts`
- DX superior para um projeto educacional

**Contras**
- Requer disciplina para manter limites entre serviços
- Pipeline pode ficar mais complexo no futuro (mitigável com cache e filtros)

**Mitigação**
- Enforçar boundaries com regras de lint
- Scripts e pipelines por app
