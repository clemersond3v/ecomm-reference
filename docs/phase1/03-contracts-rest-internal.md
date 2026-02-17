# Contratos Internos (REST) — MVP

**Nota:** Contratos internos são REST no MVP para reduzir complexidade. O **front consome GraphQL** via Gateway.

## Catalog Service
- `GET /products?cursor&limit`
- `GET /products/:id`

## Inventory Service
- `GET /availability?productId=...`
- `POST /reservations`
- `POST /reservations/:id/commit`
- `POST /reservations/:id/release`

## Order Service
- `POST /orders`
- `POST /orders/:id/checkout`
- `GET /orders/:id`

## Payment Service (mock)
- `POST /payments`
