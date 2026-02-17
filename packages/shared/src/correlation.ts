import { randomUUID } from 'crypto';

export const CORRELATION_HEADER = 'x-correlation-id';

export function getOrCreateCorrelationId(incoming?: string): string {
  const trimmed = (incoming ?? '').trim();
  if (trimmed.length > 0) return trimmed;
  return randomUUID();
}
