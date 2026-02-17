# Personas — Ecom Microservices Lab (Next.js + NestJS + AWS)

**Data:** 2026-02-16

## Persona 1 — Cliente (comprador)
- **Nome:** Amanda
- **Objetivo:** encontrar rapidamente um produto e concluir a compra sem fricção
- **Comportamentos:** usa mobile, abandona se o checkout falhar ou ficar lento
- **Dores:** lentidão, erro de pagamento, estoque “some” depois da compra
- **Critérios de sucesso:** checkout confiável, status do pedido claro

## Persona 2 — Operação/Atendimento
- **Nome:** Bruno
- **Objetivo:** entender o que aconteceu quando um pedido dá problema
- **Comportamentos:** consulta pedidos, tenta reproduzir falhas, precisa de logs
- **Dores:** “sistema distribuído” sem rastreio, falta de correlação
- **Critérios de sucesso:** rastrear pedidos ponta-a-ponta (traceId), status consistente

## Persona 3 — Engenharia/Plataforma
- **Nome:** Carol
- **Objetivo:** manter serviços escaláveis, deployáveis e observáveis
- **Comportamentos:** automatiza pipeline, monitora métricas, define SLOs
- **Dores:** deploy manual, falta de health checks, configs espalhadas
- **Critérios de sucesso:** IaC, CI/CD, readiness/liveness, dashboards mínimos
