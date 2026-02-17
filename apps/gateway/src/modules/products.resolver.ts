import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Availability, Product, ProductConnection } from './types';
import { httpJson } from './http';

type CatalogListResponse = { items: Product[]; nextCursor: string | null };
type CatalogProductResponse = Product | null;

@Resolver()
export class ProductsResolver {
  private catalogBaseUrl = process.env.CATALOG_BASE_URL ?? 'http://localhost:4001';

  @Query(() => ProductConnection)
  async products(
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<ProductConnection> {
    const qs = new URLSearchParams();
    if (cursor) qs.set('cursor', cursor);
    if (limit) qs.set('limit', String(limit));
    const url = `${this.catalogBaseUrl}/products?${qs.toString()}`;
    const res = await httpJson<CatalogListResponse>(url);
    return { items: res.items, nextCursor: res.nextCursor };
  }

  @Query(() => Product, { nullable: true })
  async product(@Args('id') id: string): Promise<Product | null> {
    const url = `${this.catalogBaseUrl}/products/${id}`;
    return await httpJson<CatalogProductResponse>(url);
  }

  @Query(() => Availability)
  async availability(@Args('productId') productId: string): Promise<Availability> {
    // Sprint 1: stubbed
    return { productId, availableQty: 10 };
  }
}
