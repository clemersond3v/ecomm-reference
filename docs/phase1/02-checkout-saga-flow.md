# Fase 1 — Fluxo de Checkout (Saga) e Consistência

**Data:** 2026-02-16

## Estados do pedido (MVP)
- `CREATED`
- `CHECKOUT_IN_PROGRESS`
- `CONFIRMED`
- `CANCELLED`

## Passos da Saga (orquestrada no Order Service)
1) Criar pedido (`POST /orders`) -> `CREATED`
2) Iniciar checkout (`POST /orders/:id/checkout`) -> `CHECKOUT_IN_PROGRESS`
3) Reservar estoque (Order -> Inventory: `POST /reservations`) -> `reservationId` + TTL
4) Processar pagamento mock (Order -> Payment: `POST /payments`) -> APPROVED/DECLINED
5) Se aprovado:
   - commit reserva (Order -> Inventory: `POST /reservations/:id/commit`)
   - Order -> `CONFIRMED`
6) Se falhou:
   - release reserva (Order -> Inventory: `POST /reservations/:id/release`)
   - Order -> `CANCELLED`

## Por que orquestrar no Order?
- Um dono do workflow do pedido: mais simples de entender e debugar
- Facilita compensações e timeouts
- Evita coreografia prematura no MVP

## Evolução para eventos (fase posterior)
- Payment publica `PaymentApproved/PaymentFailed` (fila)
- Order consome e conclui a saga
