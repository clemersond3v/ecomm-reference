# ADR-002 — GraphQL no Edge (Gateway/BFF) + Evolução para Federation

- **Status:** proposed
- **Data:** 2026-02-16

## Contexto
Queremos experiência real com GraphQL, mas em microsserviços a abordagem “GraphQL em todo lugar” pode aumentar bastante a complexidade (federation, schema composition, ownership de campos, etc.).

## Decisão
Começar com **GraphQL no Edge** via **Gateway/BFF** (NestJS + GraphQL/Apollo), onde:
- O front consome **um schema GraphQL**.
- O Gateway chama serviços internos via **REST** no MVP (e depois eventos onde fizer sentido).

Evolução planejada (fase posterior):
- Migrar para **Apollo Federation** (ou GraphQL Mesh) se e quando fizer sentido:
  - Cada serviço passa a expor subgraph GraphQL
  - O Gateway compõe schemas automaticamente

## Alternativas consideradas
1) REST no edge + REST interno  
2) GraphQL no edge (gateway) + REST interno (decisão)  
3) Federation desde o primeiro dia (complexidade alta)

## Consequências
**Prós**
- Você aprende GraphQL “de verdade” (schema, resolvers, batching, authorization, query design)
- Mantém o MVP viável sem sacrificar a experiência GraphQL
- Permite evolução natural para Federation

**Contras**
- O Gateway pode virar ponto central (mitigação: manter o Gateway fino, sem lógica de domínio)
- Necessita disciplina de contratos e versionamento

**Mitigações**
- Regras: Gateway não “regras de negócio”; apenas orquestra
- Contratos versionados em `packages/contracts`
- Instrumentação e limites (complexidade/depth) no GraphQL
