# Contrato de API (GraphQL) — Gateway/BFF (MVP)

## Schema (SDL)
```graphql
scalar DateTime
scalar JSON

type Query {
  products(cursor: String, limit: Int = 20): ProductConnection!
  product(id: ID!): Product
  availability(productId: ID!): Availability!
  order(id: ID!): Order
}

type Mutation {
  createOrder(input: CreateOrderInput!): Order!
  checkoutOrder(orderId: ID!): CheckoutResult!
}

type ProductConnection { items: [Product!]!, nextCursor: String }
type Product { id: ID!, name: String!, description: String, imageUrl: String, categoryIds: [ID!]!, attributes: JSON }
type Availability { productId: ID!, availableQty: Int! }

enum OrderStatus { CREATED CHECKOUT_IN_PROGRESS CONFIRMED CANCELLED }
type OrderItem { productId: ID!, qty: Int! }
type Order { orderId: ID!, status: OrderStatus!, items: [OrderItem!]!, reservationId: String, paymentId: String, createdAt: DateTime }

input CreateOrderInput { items: [CreateOrderItemInput!]! }
input CreateOrderItemInput { productId: ID!, qty: Int! }

type CheckoutResult { orderId: ID!, status: OrderStatus!, paymentStatus: String! }
```
