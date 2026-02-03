import Input from "@/app/components/ui/Input";
import { CategoryDTO, ProductDTO } from "@/app/domain/products/productTypes";
import Link from "next/link";
import ImagePreview from "./ui/ImagePreview";

interface ProductFormProps {
  title: string;
  action: (formData: FormData) => void;
  categories: CategoryDTO[];
  initialData?: ProductDTO;
}

export default function ProductForm({
  title,
  action,
  categories,
  initialData,
}: ProductFormProps) {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>

      <form action={action} className="space-y-5">
        {initialData?.id && (
          <input type="hidden" name="productId" value={initialData.id} />
        )}

        <Input
          label="Nama Produk"
          name="name"
          defaultValue={initialData?.name}
          placeholder="Nama produk..."
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Harga"
            name="price"
            type="number"
            defaultValue={initialData?.price}
            required
          />
          <Input
            label="Stok"
            name="stock"
            type="number"
            defaultValue={initialData?.stock}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-gray-500 uppercase ml-1">
            Kategori
          </label>
          <select
            name="categoryId"
            defaultValue={initialData?.categoryId || ""}
            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50/60 focus:border-blue-500 outline-none transition-all cursor-pointer"
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- BAGIAN PREVIEW GAMBAR LAMA (HANYA MUNCUL SAAT EDIT) --- */}
        {initialData?.images && initialData.images.length > 0 && (
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-gray-500 uppercase ml-1">
              Kelola Foto Saat Ini (Klik X untuk hapus)
            </label>
            <ImagePreview images={initialData.images} />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-gray-500 uppercase ml-1">
            Tambah Foto Baru
          </label>
          <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            className="w-full text-sm border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all shadow-sm"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-400 py-2.5"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
          >
            {initialData ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
