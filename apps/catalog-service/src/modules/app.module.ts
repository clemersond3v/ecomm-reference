import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ProductsController } from './products.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController, ProductsController],
})
export class AppModule {}
