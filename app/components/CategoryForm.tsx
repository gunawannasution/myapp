import Input from "@/app/components/ui/Input";
import { CategoriesDTO } from "@/app/domain/categories/categoryTypes";
import Link from "next/link";

interface CategoryFormProps {
  title: string;
  action: (formData: FormData) => void;
  initialData?: CategoriesDTO; // Jika ada data, otomatis mode Edit
}

export default function CategoryForm({
  title,
  action,
  initialData,
}: CategoryFormProps) {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>

      <form action={action} className="space-y-6">
        {/* Hidden ID hanya muncul jika mode Edit */}
        {initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}

        <Input
          label="Nama Kategori"
          name="name"
          defaultValue={initialData?.name}
          placeholder="Contoh: Elektronik, Pakaian..."
          required
        />

        <div className="flex justify-end gap-4 pt-2">
          <Link
            href="/categories"
            className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors py-2"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            {initialData ? "Perbarui" : "Simpan"} Kategori
          </button>
        </div>
      </form>
    </div>
  );
}
