# Visão do Produto — Ecom Microservices Lab (Next.js + NestJS + AWS)

**Data:** 2026-02-16  
**Repositório (proposto):** `ecomm-reference`  

## 1. Objetivo
Construir um e-commerce educacional, porém realista, para praticar ponta-a-ponta **Engenharia/Arquitetura de Software** com foco em:
- Microsserviços (serviços com deploy e dados independentes)
- **GraphQL** para experiência de API moderna
- Containerização (Docker)
- Orquestração (Kubernetes)
- Infra as Code (Terraform)
- Cloud na AWS (ECR/EKS/RDS/S3/CloudFront/SQS/SNS, etc.)
- Observabilidade e qualidade (logs, métricas, tracing, testes)

## 2. Resultado esperado (o que “vai existir” no final)
- Front-end em **Next.js** consumindo uma API **GraphQL** (BFF/Gateway)
- Microsserviços em **NestJS** (Node + TypeScript), cada um com seu banco (Postgres)
- Ambiente local via Docker Compose
- Ambiente Kubernetes local (kind/minikube)
- Deploy em AWS com IaC (Terraform), incluindo cluster EKS e artefatos em ECR
- Documentação de arquitetura (C4 + ADRs) e execução (runbooks)
- CI/CD básico (build/test/push/deploy)

## 3. Escopo funcional (MVP)
- Catálogo: listar produtos, detalhes do produto
- Carrinho/Checkout simplificado: criar pedido, reservar estoque, simular pagamento
- Status do pedido: criado, confirmado, cancelado
- Admin mínimo (opcional): cadastro de produto (seed/script)

## 4. Fora do escopo (por enquanto)
- Marketplace, multi-tenant, multi-warehouse avançado
- Motor de busca (Elastic), recomendação, antifraude real
- Pagamentos reais (integração com adquirentes) — usaremos mock inicialmente
- Painel admin completo

## 5. Indicadores de sucesso
- Conseguir explicar e demonstrar **por que** a arquitetura foi desenhada assim (ADRs)
- Conseguir subir local e cloud com um comando (ou poucos)
- Serviços com deploy e banco independentes
- API GraphQL funcionando e documentada
- Observabilidade mínima e testes essenciais

## 6. Stakeholders (no projeto)
- **Você (engenheiro/arquiteto em formação):** define arquitetura, implementa e opera
- **Usuário final (cliente do e-commerce):** navega no catálogo e compra
- **Operação/Negócio (fictício):** precisa de estabilidade, rastreabilidade, métricas
