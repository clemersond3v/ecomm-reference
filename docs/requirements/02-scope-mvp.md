# Escopo do MVP — Ecom Microservices Lab (Next.js + NestJS + AWS)

**Data:** 2026-02-16

## 1. Funcionalidades incluídas (MVP)
### 1.1 Catálogo
- Listar produtos (paginado simples)
- Ver detalhes de um produto (incluindo preço e disponibilidade)

### 1.2 Checkout simplificado
- Criar pedido com itens (validação de disponibilidade)
- Reservar estoque por um tempo (hold)
- Simular pagamento (aprovado/reprovado)
- Confirmar/cancelar pedido

### 1.3 Status do pedido
- Consultar pedido e seu status
- Histórico básico de eventos do pedido (timestamps)

## 2. Serviços (MVP)
- **Catalog Service**: produtos e categorias
- **Inventory Service**: estoque e reservas
- **Order Service**: pedido e saga de checkout
- **Payment Service (mock)**: simulação de pagamento

## 3. API para o Front
- **GraphQL Gateway/BFF** para expor um schema amigável ao front-end
- O front não chama serviços diretamente

## 4. Critérios de “MVP pronto”
- Subir localmente via Docker Compose
- Executar um fluxo completo: listar produto → criar pedido → reservar estoque → pagar (mock) → pedido confirmado/cancelado
- Logs estruturados e correlation/trace id em todas as requisições
- Documentação mínima de execução e arquitetura
