# ADR-003 — Gateway GraphQL (BFF) como única interface para o Front

- **Status:** proposed
- **Data:** 2026-02-16

## Contexto
Chamar múltiplos microsserviços direto do front aumenta acoplamento, latência e complexidade (auth, retries, versionamento).

## Decisão
Criar um **Gateway GraphQL (BFF)** que expõe um schema único para o Next.js e orquestra chamadas internas.

## Consequências
- Pró: experiência GraphQL completa e front desacoplado
- Contra: risco de virar gargalo/monólito (mitigação: manter gateway fino e escalável)
