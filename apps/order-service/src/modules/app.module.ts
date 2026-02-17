import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { OrdersController } from './orders.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController, OrdersController],
})
export class AppModule {}
