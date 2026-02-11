// app/products/page.tsx
import DataTable from "@/app/components/DataTable";
import Image from "next/image"; // Gunakan Next Image agar optimal
import Link from "next/link";
import { deleteProductAction } from "../../actions/productAction";
import DeleteButton from "../../components/ui/DeleteButton";
import { ProductRepository } from "../../repositories/productRepository";
import { ProductService } from "../../services/productServices";

export const dynamic = "force-dynamic";

export default async function ProductListPage() {
  const productService = new ProductService(new ProductRepository());

  let products = [];
  try {
    products = await productService.getAll();
  } catch (e) {
    console.error("[ProductListPage]", e);
  }

  return (
    <section className="max-w-5xl mx-auto mt-10 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Products
        </h1>
        <Link
          href="/admin/products/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
        >
          + New Product
        </Link>
      </header>

      <DataTable
        data={products}
        columns={[
          {
            header: "Preview",
            accessor: (product) => (
              <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[10px] text-gray-300 uppercase">
                    No Img
                  </div>
                )}
              </div>
            ),
          },
          { header: "Nama Product", accessor: "name" },
          {
            header: "Harga",
            accessor: (product) =>
              `Rp ${product.price.toLocaleString("id-ID")}`,
          },
          { header: "Stok", accessor: "stock" },
        ]}
        renderActions={(product) => {
          const deleteWithId = deleteProductAction.bind(null, product.id);

          return (
            <div className="flex items-center gap-4">
              <Link href={`/admin/products/${product.id}/edit`} className="...">
                Edit
              </Link>

              {/* Ganti form lama dengan komponen Client ini */}
              <DeleteButton action={deleteWithId} />
            </div>
          );
        }}
      />
    </section>
  );
}
