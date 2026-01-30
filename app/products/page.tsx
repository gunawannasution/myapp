// app/products/page.tsx
import DataTable from "@/app/components/DataTable";
import Link from "next/link";
import { deleteProductAction } from "../actions/productAction";
import { ProductRepository } from "../repositories/productRepository";
import { ProductService } from "../services/productServices";

export default async function ProductListPage() {
  const productService = new ProductService(new ProductRepository());

  // Professional: Data diambil langsung di level server
  const products = await productService.getAll();

  return (
    <section className="max-w-4xl mx-auto mt-10">
      <header className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/create">New Product</Link>
      </header>

      <DataTable
        data={products}
        columns={[
          { header: "Nama Product", accessor: "name" },
          { header: "Harga", accessor: "price" },
          { header: "Stok", accessor: "stock" },
        ]}
        renderActions={(product) => (
          <div className="flex gap-2">
            <Link href={`/products/${product.id}/edit`}>Edit</Link>

            <form action={deleteProductAction}>
              <input type="hidden" name="productId" value={product.id} />
              <button type="submit">Delete</button>
            </form>
          </div>
        )}
      />
    </section>
  );
}
