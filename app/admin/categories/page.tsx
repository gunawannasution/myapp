import DeleteButton from "@/app/components/ui/DeleteButton";
import { CategoriesDTO } from "@/app/domain/categories/categoryTypes";
import Link from "next/link";
import { deleteCategoryAction } from "../../actions/CategoryAction";
import DataTable from "../../components/DataTable";
import { CategoryRepo } from "../../repositories/categoryRepo";
import { CategoryServices } from "../../services/categoryServices";

export default async function CategoryPage() {
  // Inisialisasi Service sesuai alur DDD
  const categoryServices = new CategoryServices(new CategoryRepo());
  const categories = await categoryServices.getAll();

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

      <DataTable<CategoriesDTO>
        data={categories}
        columns={[{ header: "Nama Category", accessor: "name" }]}
        renderActions={(category: CategoriesDTO) => {
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
    </section>
  );
}
