// app/admin/distributors/page.tsx
import { deleteDistributorAction } from "@/app/actions/distributorAction";
import DataTable from "@/app/components/DataTable";
import DeleteButton from "@/app/components/ui/DeleteButton";
import { DistributorRepository } from "@/app/repositories/DistributorRepository";
import { DistributorServices } from "@/app/services/DistributorServices";
import Link from "next/link";

export default async function DistributorListPage() {
  const distributorService = new DistributorServices(
    new DistributorRepository(),
  );

  let distributors = [];
  let dbError: string | null = null;

  try {
    distributors = await distributorService.getAll();
  } catch (error) {
    console.error("[DistributorListPage] DB ERROR:", error);
    dbError = "Database sedang tidak tersedia. Silakan coba lagi nanti.";
  }

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
          + New Distributor
        </Link>
      </header>

      {dbError ? (
        <div className="p-6 rounded-xl border border-red-200 bg-red-50 text-red-700">
          <h2 className="font-bold mb-2">Terjadi Kesalahan</h2>
          <p className="text-sm">{dbError}</p>
        </div>
      ) : (
        <DataTable
          data={distributors}
          columns={[{ header: "Nama Distributor", accessor: "name" }]}
          renderActions={(distributor) => {
            const deleteWithId = deleteDistributorAction.bind(
              null,
              distributor.id,
            );

            return (
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/distributors/${distributor.id}/edit`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteWithId} />
              </div>
            );
          }}
        />
      )}
    </section>
  );
}
