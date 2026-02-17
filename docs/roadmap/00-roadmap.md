# Roadmap (alto nível) — Ecom Microservices Lab (Next.js + NestJS + AWS)

**Data:** 2026-02-16

## Sprint 1 — Foundation local (Docker Compose)
- Monorepo + padrões (lint/tsconfig)
- Web + Gateway GraphQL + Catalog/Order (skeleton)
- Postgres por serviço
- Dockerfiles + compose

## Sprint 2 — Inventory + Checkout básico
- Inventory Service + reservas
- Saga simples no Order (sync)
- Primeiros testes de integração

## Sprint 3 — Eventos (assíncrono)
- Introduzir eventos no fluxo de pagamento/confirmacão
- Idempotência e outbox (mínimo)

## Sprint 4 — Kubernetes local
- Deploy no kind/minikube
- Ingress, configs, secrets, probes, HPA básico

## Sprint 5 — AWS com Terraform
- VPC + EKS + ECR + RDS
- Deploy base + observabilidade mínima

## Sprint 6 — CI/CD e maturidade
- Pipelines (build/test/push/deploy)
- SLOs básicos e alertas
