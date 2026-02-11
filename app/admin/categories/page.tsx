// app/admin/categories/page.tsx
export const dynamic = "force-dynamic";

import DataTable from "@/app/components/DataTable";
import DeleteButton from "@/app/components/ui/DeleteButton";
import { CategoriesDTO } from "@/app/domain/categories/categoryTypes";
import Link from "next/link";
import { deleteCategoryAction } from "../../actions/CategoryAction";
import { CategoryRepo } from "../../repositories/categoryRepo";
import { CategoryServices } from "../../services/categoryServices";

export default async function CategoryPage() {
  const categoryServices = new CategoryServices(new CategoryRepo());

  let categories: CategoriesDTO[] = [];
  let dbError = false;

  try {
    categories = await categoryServices.getAll();
  } catch (error) {
    console.error("[CategoryPage] DB ERROR:", error);
    dbError = true;
  }

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">DATA CATEGORY</h1>
        <Link
          href="/admin/categories/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        >
          + Tambah Category
        </Link>
      </header>

      {dbError ? (
        <div className="p-5 border border-red-200 bg-red-50 rounded-lg text-red-700">
          <h2 className="font-semibold mb-1">Layanan tidak tersedia</h2>
          <p className="text-sm">
            Data kategori tidak dapat dimuat. Silakan coba beberapa saat lagi.
          </p>
        </div>
      ) : (
        <DataTable<CategoriesDTO>
          data={categories}
          columns={[{ header: "Nama Category", accessor: "name" }]}
          renderActions={(category) => {
            const deleteWithId = deleteCategoryAction.bind(null, category.id);

            return (
              <div className="flex gap-3">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
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
