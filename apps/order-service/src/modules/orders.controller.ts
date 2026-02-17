import { Body, Controller, Get, Param, Post } from '@nestjs/common';

type OrderStatus = 'CREATED' | 'CHECKOUT_IN_PROGRESS' | 'CONFIRMED' | 'CANCELLED';
type OrderItem = { productId: string; qty: number };
type Order = {
  orderId: string;
  status: OrderStatus;
  items: OrderItem[];
  reservationId?: string | null;
  paymentId?: string | null;
  createdAt: string;
};

const ORDERS = new Map<string, Order>();

function newId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

@Controller()
export class OrdersController {
  @Post('orders')
  create(@Body() body: { items: OrderItem[] }) {
    const orderId = newId('o');
    const order: Order = { orderId, status: 'CREATED', items: body.items ?? [], reservationId: null, paymentId: null, createdAt: new Date().toISOString() };
    ORDERS.set(orderId, order);
    return { orderId: order.orderId, status: order.status };
  }

  @Post('orders/:id/checkout')
  checkout(@Param('id') id: string) {
    const order = ORDERS.get(id);
    if (!order) return null;
    order.status = 'CONFIRMED';
    order.paymentId = newId('pay');
    ORDERS.set(id, order);
    return { orderId: order.orderId, status: order.status, paymentStatus: 'APPROVED' };
  }

  @Get('orders/:id')
  get(@Param('id') id: string) {
    return ORDERS.get(id) ?? null;
  }
}
