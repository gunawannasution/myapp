// app/products/page.tsx
import DataTable from "@/app/components/DataTable";
import { DistibutorRepository } from "@/app/repositories/DistributorRepository";
import { DistributorServices } from "@/app/services/DistributorServices";
import Link from "next/link";
import { deleteProductAction } from "../../actions/productAction";
import DeleteButton from "../../components/ui/DeleteButton";

export default async function DistributorListPage() {
  const distributorService = new DistributorServices(
    new DistibutorRepository(),
  );
  const distributor = await distributorService.getAll();

  return (
    <section className="max-w-5xl mx-auto mt-10 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Distributor
        </h1>
        <Link
          href="/admin/distributors/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
        >
          + New Product
        </Link>
      </header>

      <DataTable
        data={distributor}
        columns={[
          // {
          //   header: "Preview",
          //   accessor: (product) => (
          //     <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
          //       {product.images && product.images.length > 0 ? (
          //         <Image
          //           src={product.images[0].url}
          //           alt={product.name}
          //           fill
          //           className="object-cover"
          //         />
          //       ) : (
          //         <div className="flex items-center justify-center h-full text-[10px] text-gray-300 uppercase">
          //           No Img
          //         </div>
          //       )}
          //     </div>
          //   ),
          // },
          { header: "Nama Distributor", accessor: "name" },
          // {
          //   header: "Harga",
          //   accessor: (product) =>
          //     `Rp ${product.price.toLocaleString("id-ID")}`,
          // },
          // { header: "Stok", accessor: "stock" },
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
