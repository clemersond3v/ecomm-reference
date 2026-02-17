# Requisitos Não Funcionais (NFRs) — Ecom Microservices Lab (Next.js + NestJS + AWS)

**Data:** 2026-02-16

## 1. Confiabilidade e Resiliência
- Timeouts explícitos em chamadas entre serviços
- Retentativas com backoff em falhas transitórias (com limites)
- Idempotência em operações críticas (ex.: pagamento confirmado / eventos duplicados)

## 2. Performance
- Listagem de produtos em até ~300ms local (alvo educacional)
- GraphQL com limites de complexidade (para evitar queries pesadas)

## 3. Segurança (MVP)
- Secrets não versionados (K8s Secrets / AWS Secrets Manager futuro)
- Autenticação pode ser simplificada no MVP (token mock), mas com estrutura pronta para evoluir para OIDC

## 4. Observabilidade
- Logs estruturados JSON em todos os serviços
- CorrelationId/TraceId propagado por request
- Health checks: liveness e readiness
- Métricas básicas (pelo menos contadores de request e latência)

## 5. Operabilidade / Deploy
- Serviços devem iniciar via env vars (12-factor)
- `docker compose up` para dev
- Kubernetes manifests/helm para ambientes
- IaC com Terraform para cloud

## 6. Manutenibilidade
- Padrões de lint/format
- Testes unitários no domínio e integração por serviço
- Contratos (schema GraphQL e eventos) versionados em `packages/contracts`
