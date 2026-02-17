# C4 — Component Diagram (Gateway e Serviços)

## Objetivo
Mostrar os **componentes principais** dentro dos containers mais importantes e como eles colaboram.

## Gateway (NestJS + GraphQL)
**Responsabilidade:** compor dados e expor contrato **GraphQL** (BFF).

Componentes:
- **Resolvers**: implementam queries/mutations e orquestram chamadas.
- **GraphQL Types**: schema (ObjectTypes, Inputs, Connections) com tipagem explícita.
- **HTTP Client**: módulo utilitário para chamadas REST internas (timeout/retry no futuro).
- **Cross-cutting**: correlation-id, padronização de erros, limites de query/rate limit (futuro).

## Catalog Service (NestJS REST)
**Responsabilidade:** catálogo/produtos.

Componentes:
- **Controllers**: endpoints REST (`/products`, `/health/*`).
- **Use Cases**: regras de aplicação (listar, obter produto).
- **Repository/Adapter**: acesso ao Postgres do catálogo.

## Order Service (NestJS REST)
**Responsabilidade:** pedidos/checkout.

Componentes:
- **Controllers**: endpoints REST (`/orders`, `/health/*`).
- **Use Cases**: criar pedido, checkout (saga/evolução futura).
- **Repository/Adapter**: acesso ao Postgres de pedidos.

## Observação
No futuro, a comunicação interna pode evoluir de REST para **eventos** (outbox + broker),
mantendo o Gateway como camada de composição e contrato para o front.
