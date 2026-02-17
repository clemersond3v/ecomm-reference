# C4 — Containers (Nível 2)

## Containers principais
1) **Web (Next.js)**
- Renderização e UI
- Consome GraphQL

2) **GraphQL Gateway/BFF (NestJS)**
- Expõe schema GraphQL único
- Orquestra chamadas para serviços internos
- Não contém regras centrais do domínio (mantém-se fino)

3) **Catalog Service (NestJS)**
- Produtos e categorias
- Banco: Postgres (catalog_db)

4) **Inventory Service (NestJS)**
- Estoque e reservas (hold)
- Banco: Postgres (inventory_db)

5) **Order Service (NestJS)**
- Pedido e saga do checkout
- Banco: Postgres (order_db)

6) **Payment Service (NestJS - mock)**
- Simula aprovação/negação
- Pode publicar eventos no futuro

## Comunicação
- Web -> Gateway: GraphQL (HTTP)
- Gateway -> serviços: REST (HTTP) no MVP
- Evolução: eventos (SQS/SNS) para checkout e integrações

## Observabilidade
- Logs JSON + correlationId/traceId propagado em todos os hops
