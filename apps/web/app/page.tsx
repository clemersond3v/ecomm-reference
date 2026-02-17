type Product = {
  id: string;
  name: string;
  description?: string | null;
};

type ProductsQueryData = {
  products: {
    items: Product[];
  };
};

async function gql<TData>(query: string, variables?: Record<string, unknown>): Promise<TData> {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:4000/graphql';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  const json: { data?: TData; errors?: Array<{ message: string }> } = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  if (!json.data) throw new Error('GraphQL response missing data');
  return json.data;
}

export default async function Home() {
  const data = await gql<ProductsQueryData>(`
    query Products($limit: Int) {
      products(limit: $limit) {
        items { id name description }
      }
    }
  `, { limit: 20 });

  return (
    <main>
      <h1>Ecomm Reference</h1>
      <p>Next.js consumindo GraphQL no Gateway.</p>

      <h2>Produtos</h2>
      <ul>
        {data.products.items.map((p: Product) => (
          <li key={p.id} style={{ marginBottom: 12 }}>
            <strong>{p.name}</strong>
            <div style={{ opacity: 0.8 }}>{p.description}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>id: {p.id}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
