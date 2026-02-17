# User Stories — Ecom Microservices Lab (Next.js + NestJS + AWS)

**Data:** 2026-02-16

## 1. Catálogo
1. Como **cliente**, quero **listar produtos**, para **navegar e escolher um item**.
   - **Aceite:** retorna lista paginada com id, nome, preço e disponibilidade.
2. Como **cliente**, quero **ver detalhes do produto**, para **decidir comprar**.
   - **Aceite:** retorna descrição, imagens (mock), categorias e estoque.

## 2. Carrinho/Checkout
3. Como **cliente**, quero **criar um pedido com itens**, para **iniciar a compra**.
   - **Aceite:** valida itens e quantidades; retorna `orderId`.
4. Como **cliente**, quero **reservar o estoque**, para **garantir disponibilidade durante o pagamento**.
   - **Aceite:** reserva com TTL; impede over-selling.
5. Como **cliente**, quero **pagar o pedido** (simulado), para **finalizar a compra**.
   - **Aceite:** pagamento aprovado confirma; reprovado cancela e libera reserva.

## 3. Pós-compra / Observabilidade
6. Como **cliente**, quero **consultar o status do pedido**, para **acompanhar a compra**.
   - **Aceite:** exibe status e timestamps.
7. Como **atendimento**, quero **rastrear um pedido ponta-a-ponta**, para **diagnosticar problemas**.
   - **Aceite:** existe `traceId`/`correlationId` em logs e respostas.

## 4. Técnico (Engenharia)
8. Como **engenheiro**, quero **subir tudo em containers**, para **reproduzir ambiente**.
   - **Aceite:** `docker compose up` levanta web + serviços + bancos.
9. Como **engenheiro**, quero **rodar em Kubernetes local**, para **praticar orquestração**.
   - **Aceite:** manifests/helm sobem o stack com Ingress.
10. Como **engenheiro**, quero **provisionar AWS com Terraform**, para **praticar IaC**.
   - **Aceite:** EKS/ECR/RDS criados via IaC; deploy automatizável.

## Priorização sugerida
- P0: 1,2,3,4,5,6,8
- P1: 7,9
- P2: 10
