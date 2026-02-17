import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { CORRELATION_HEADER, getOrCreateCorrelationId, logger } from '@ecomm/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.use((req: any, res: any, next: any) => {
    const correlationId = getOrCreateCorrelationId(req.headers[CORRELATION_HEADER]);
    req.correlationId = correlationId;
    res.setHeader(CORRELATION_HEADER, correlationId);

    const start = Date.now();
    res.on('finish', () => {
      logger.info('request', { service: process.env.SERVICE_NAME ?? 'gateway', correlationId, route: req.originalUrl }, { statusCode: res.statusCode, durationMs: Date.now() - start });
    });

    next();
  });

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
  logger.info('service_started', { service: process.env.SERVICE_NAME ?? 'gateway' }, { port, graphqlPath: '/graphql' });
}

bootstrap();
