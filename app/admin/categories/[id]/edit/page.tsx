import { updateCategoryAction } from "@/app/actions/CategoryAction";
import CategoryForm from "@/app/components/CategoryForm";
import { CategoryRepo } from "@/app/repositories/categoryRepo";
import { CategoryServices } from "@/app/services/categoryServices";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = new CategoryServices(new CategoryRepo());
  const category = await service.getById(id);

  if (!category)
    return <div className="text-center mt-10">Kategori tidak ditemukan</div>;

  return (
    <CategoryForm
      title="Edit Kategori"
      action={updateCategoryAction}
      initialData={category}
    />
  );
}
