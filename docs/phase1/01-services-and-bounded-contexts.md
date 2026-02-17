# Fase 1 — Definição de Serviços (Bounded Contexts) e Responsabilidades

**Data:** 2026-02-16  
**Sistema:** E-commerce (Next.js) + Gateway GraphQL (NestJS) + Microsserviços (NestJS)

## Objetivo desta etapa
Definir limites claros de domínio (bounded contexts) para que os serviços sejam:
- coesos (uma responsabilidade principal),
- pouco acoplados (dependem minimamente uns dos outros),
- deployáveis e escaláveis de forma independente.

## Serviços do MVP (propostos)

### 1) Catalog Service
**Responsabilidade:** fonte de verdade de **produtos** e **categorias** (dados “descritivos”).  
**Dados (exemplos):** productId, name, description, categoryIds, attributes, images (URLs).  
**Não faz:** regras de checkout, reserva de estoque, pagamento.

**API interna (MVP):**
- `GET /products?cursor&limit`
- `GET /products/:id`

**Banco:** `catalog_db` (Postgres)

---

### 2) Inventory Service
**Responsabilidade:** fonte de verdade de **estoque** e **reservas (holds)**.  
**Dados (exemplos):** productId, availableQty, reservedQty, reservationId, ttl.  
**Não faz:** catálogo, preço, pagamento.

**API interna (MVP):**
- `GET /availability?productId=...`
- `POST /reservations` (cria reserva com TTL)
- `POST /reservations/:id/commit` (confirma/baixa)
- `POST /reservations/:id/release` (libera)

**Banco:** `inventory_db` (Postgres)

---

### 3) Order Service
**Responsabilidade:** fonte de verdade do **pedido** e do **workflow do checkout (saga)**.  
**Dados (exemplos):** orderId, items, status, reservationId, paymentId.  
**Não faz:** baixar estoque direto (chama Inventory), processar pagamento real (chama Payment).

**API interna (MVP):**
- `POST /orders` (criar pedido em estado `CREATED`)
- `POST /orders/:id/checkout` (inicia saga: reserva + pagamento)
- `GET /orders/:id`

**Banco:** `order_db` (Postgres)

---

### 4) Payment Service (mock)
**Responsabilidade:** simular autorização/captura de pagamento e produzir resultado.  
**API interna (MVP):**
- `POST /payments` (simula, retorna APPROVED/DECLINED)

**Banco:** opcional no MVP (in-memory) — podemos adicionar `payment_db` para prática.

---

## Edge/API para o Front

### 5) GraphQL Gateway / BFF (NestJS)
**Responsabilidade:** expor **GraphQL** para o Next.js e orquestrar chamadas internas.  
**Regras:**
- Não conter regras centrais do domínio (sem “lógica do pedido” aqui).
- Resolver queries/mutations chamando serviços internos.
- Implementar limites e observabilidade.

**GraphQL (MVP):**
- Queries: `products`, `product(id)`, `availability(productId)`, `order(id)`
- Mutations: `createOrder`, `checkoutOrder`

## Por que esta divisão é “segura”?
- Checkout fica no Order (saga), evitando que o Gateway vire monólito.
- Inventory isola a parte mais crítica (over-selling, reservas).
- Payment começa mockável, mas com fronteira clara para crescer.
