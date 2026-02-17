# Padrão de Observabilidade (MVP)

- Logs em JSON
- `x-correlation-id`:
  - se vier, propagar
  - se não vier, gerar no Gateway
- Health checks:
  - `GET /health/live`
  - `GET /health/ready`
- Campos mínimos no log:
  - `service`, `correlationId`, `route`, `statusCode`, `durationMs`
