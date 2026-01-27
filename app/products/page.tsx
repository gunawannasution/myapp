import { deleteProductAction } from "@/app/actions/productActions";
import DataTable from "@/app/components/DataTable";
import Link from "next/link";
import { getProducts } from "../services/product.service";

export default async function ProductsPage() {
  const products = await getProducts();

  const columns = [
    { header: "ID", accessor: "id" as const },
    { header: "Nama Produk", accessor: "nama" as const },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
        {!products.ok && <p className="text-orange-500">Data Tidak Tersedia</p>}
        <Link href="/products/create" className="btn-primary">
          + Tambah
        </Link>
      </div>

      <DataTable
        data={products.data}
        columns={columns}
        actions={(p) => (
          <>
            <Link href={`/products/${p.id}/edit`} className="text-indigo-600">
              Edit
            </Link>
            <form action={deleteProductAction.bind(null, p.id)}>
              <button className="text-red-600">Hapus</button>
            </form>
          </>
        )}
      />
    </div>
  );
}
