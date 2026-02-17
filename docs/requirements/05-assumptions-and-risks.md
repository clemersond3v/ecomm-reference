# Premissas e Riscos — Ecom Microservices Lab (Next.js + NestJS + AWS)

**Data:** 2026-02-16

## Premissas
- TypeScript em front e back
- Postgres como banco padrão por serviço
- GraphQL exposto no BFF/Gateway para o front
- Comunicação interna pode começar REST e evoluir para eventos

## Riscos
- GraphQL + microsserviços pode aumentar complexidade (mitigação: começar com GraphQL no edge)
- Kubernetes e AWS têm curva de aprendizado (mitigação: fases e ambientes incrementais)
- Consistência distribuída no checkout (mitigação: saga orquestrada no Order)

## Estratégia de mitigação (macro)
- Entregar valor pequeno por sprint (MVP local primeiro)
- Documentar decisões (ADRs) antes de “codar demais”
- Automatizar desde cedo (scripts de run/build)
