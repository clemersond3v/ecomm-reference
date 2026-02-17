import { Field, ID, Int, ObjectType, InputType, registerEnumType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

export enum OrderStatus {
  CREATED = 'CREATED',
  CHECKOUT_IN_PROGRESS = 'CHECKOUT_IN_PROGRESS',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
registerEnumType(OrderStatus, { name: 'OrderStatus' });

@ObjectType()
export class Product {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) imageUrl?: string;
  @Field(() => [ID]) categoryIds!: string[];
  @Field(() => GraphQLJSON, { nullable: true }) attributes?: Record<string, any>;
}

@ObjectType()
export class ProductConnection {
  @Field(() => [Product]) items!: Product[];
  @Field({ nullable: true }) nextCursor?: string | null;
}

@ObjectType()
export class Availability {
  @Field(() => ID) productId!: string;
  @Field(() => Int) availableQty!: number;
}

@ObjectType()
export class OrderItem {
  @Field(() => ID) productId!: string;
  @Field(() => Int) qty!: number;
}

@ObjectType()
export class Order {
  @Field(() => ID) orderId!: string;
  @Field(() => OrderStatus) status!: OrderStatus;
  @Field(() => [OrderItem]) items!: OrderItem[];
  @Field({ nullable: true }) reservationId?: string | null;
  @Field({ nullable: true }) paymentId?: string | null;
  @Field({ nullable: true }) createdAt?: string | null;
}

@InputType()
export class CreateOrderItemInput {
  @Field(() => ID) productId!: string;
  @Field(() => Int) qty!: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => [CreateOrderItemInput]) items!: CreateOrderItemInput[];
}

@ObjectType()
export class CheckoutResult {
  @Field(() => ID) orderId!: string;
  @Field(() => OrderStatus) status!: OrderStatus;
  @Field() paymentStatus!: string;
}
