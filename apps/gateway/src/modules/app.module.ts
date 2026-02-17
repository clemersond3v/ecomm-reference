import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HealthController } from './health.controller';
import { ProductsResolver } from './products.resolver';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [
    TerminusModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: true,
      introspection: true,
    }),
  ],
  controllers: [HealthController],
  providers: [ProductsResolver, OrdersResolver],
})
export class AppModule {}
