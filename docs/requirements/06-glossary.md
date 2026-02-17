# Glossário — Ecom Microservices Lab (Next.js + NestJS + AWS)

- **BFF (Backend for Frontend):** camada que expõe API otimizada para o front.
- **GraphQL Gateway:** serviço que expõe um schema GraphQL e orquestra chamadas para serviços internos.
- **Bounded Context:** fronteira de um domínio no DDD; boa base para definir serviços.
- **Saga:** coordenação de transações distribuídas por meio de etapas e compensações.
- **Idempotência:** repetir a mesma operação não gera efeitos colaterais duplicados.
- **Outbox Pattern:** estratégia para publicar eventos de forma consistente com o banco do serviço.
- **Readiness/Liveness:** checks do Kubernetes para disponibilidade do container.
