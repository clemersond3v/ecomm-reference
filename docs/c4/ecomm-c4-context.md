# C4 — Context Diagram (Ecomm Reference)

## Escopo
Este diagrama descreve **quem usa** o sistema e **quais sistemas externos** se relacionam com ele (hoje e previstos).

## Atores
- **Cliente**: pessoa que navega e compra via Web.
- **Equipe Técnica (Dev/Ops)**: mantém o sistema, faz deploy e observa a operação.

## Sistema principal
- **Ecomm Reference**: e-commerce composto por:
  - Web (Next.js)
  - Gateway (NestJS + GraphQL)
  - Microsserviços (Catalog, Order)
  - Bancos isolados por serviço (PostgreSQL)

## Sistemas externos (futuro)
- **Provedor de Pagamento**: autoriza/captura/estorna pagamentos.
- **Serviço de Estoque**: reserva de estoque, disponibilidade e liberação.
- **Observabilidade**: logs, métricas e tracing distribuído (ex.: OpenTelemetry + collector + backend).

## Relações
- Cliente → Web: HTTP(S)
- Web → Gateway: GraphQL
- Gateway → Serviços internos: REST interno (Sprint 1)
- Ecomm Reference → Observabilidade: logs/métricas/tracing
