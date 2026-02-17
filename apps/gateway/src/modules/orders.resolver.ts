import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckoutResult, CreateOrderInput, Order } from './types';
import { httpJson } from './http';

type CreateOrderResponse = { orderId: string; status: string };
type CheckoutResponse = { orderId: string; status: string; paymentStatus: string };
type OrderResponse = Order | null;

@Resolver()
export class OrdersResolver {
  private orderBaseUrl = process.env.ORDER_BASE_URL ?? 'http://localhost:4002';

  @Mutation(() => Order)
  async createOrder(@Args('input') input: CreateOrderInput): Promise<Order> {
    const url = `${this.orderBaseUrl}/orders`;
    const res = await httpJson<CreateOrderResponse>(url, {
      method: 'POST',
      body: JSON.stringify({ items: input.items }),
    });

    return {
      orderId: res.orderId,
      status: res.status as any,
      items: input.items,
      reservationId: null,
      paymentId: null,
      createdAt: new Date().toISOString(),
    };
  }

  @Mutation(() => CheckoutResult)
  async checkoutOrder(@Args('orderId') orderId: string): Promise<CheckoutResult> {
    const url = `${this.orderBaseUrl}/orders/${orderId}/checkout`;
    const res = await httpJson<CheckoutResponse>(url, { method: 'POST' });

    return { orderId: res.orderId, status: res.status as any, paymentStatus: res.paymentStatus };
  }

  @Query(() => Order, { nullable: true })
  async order(@Args('id') id: string): Promise<Order | null> {
    const url = `${this.orderBaseUrl}/orders/${id}`;
    return await httpJson<OrderResponse>(url);
  }
}
