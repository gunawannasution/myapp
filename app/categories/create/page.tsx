import { addCategoryAction } from "@/app/actions/CategoryAction";
import CategoryForm from "@/app/components/CategoryForm";

export default function CreateCategoryPage() {
  return <CategoryForm title="Tambah Kategori" action={addCategoryAction} />;
}
