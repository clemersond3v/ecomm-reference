import { Controller, Get, Param, Query } from '@nestjs/common';

type Product = {
  id: string;
  name: string;
  description?: string;
  categoryIds: string[];
  imageUrl?: string;
  attributes?: Record<string, unknown>;
};

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Tênis X', description: 'Produto de exemplo', categoryIds: ['c1'], imageUrl: 'https://example.com/p1.png', attributes: { color: 'black' } },
  { id: 'p2', name: 'Tênis Y', description: 'Produto de exemplo 2', categoryIds: ['c1'], imageUrl: 'https://example.com/p2.png', attributes: { color: 'white' } },
];

@Controller()
export class ProductsController {
  @Get('products')
  list(@Query('cursor') _cursor?: string, @Query('limit') limit?: string) {
    const take = Math.min(Number(limit ?? 20), 50);
    return { items: PRODUCTS.slice(0, take), nextCursor: null };
  }

  @Get('products/:id')
  get(@Param('id') id: string) {
    return PRODUCTS.find((p) => p.id === id) ?? null;
  }
}
