type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerContext {
  correlationId?: string;
  service?: string;
  route?: string;
}

function nowIso(): string {
  return new Date().toISOString();
}

export function log(
  level: LogLevel,
  message: string,
  ctx: LoggerContext = {},
  extra: Record<string, unknown> = {},
) {
  const payload = {
    ts: nowIso(),
    level,
    message,
    ...ctx,
    ...extra,
  };
  console.log(JSON.stringify(payload));
}

export const logger = {
  debug: (msg: string, ctx?: LoggerContext, extra?: Record<string, unknown>) =>
    log('debug', msg, ctx, extra),
  info: (msg: string, ctx?: LoggerContext, extra?: Record<string, unknown>) =>
    log('info', msg, ctx, extra),
  warn: (msg: string, ctx?: LoggerContext, extra?: Record<string, unknown>) =>
    log('warn', msg, ctx, extra),
  error: (msg: string, ctx?: LoggerContext, extra?: Record<string, unknown>) =>
    log('error', msg, ctx, extra),
};
