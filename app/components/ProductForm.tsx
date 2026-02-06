// app/products/_components/ProductForm.tsx
"use client";

import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import { ProductDTO } from "@/app/domain/products/productTypes";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useFormStatus } from "react-dom";
import SubmitButton from "../admin/products/SubmitButton";
import { CategoriesDTO } from "../domain/categories/categoryTypes";
import ImagePreview from "./ui/ImagePreview";

interface ProductFormProps {
  title: string;
  action: (formData: FormData) => void;
  categories: CategoriesDTO[];
  initialData?: ProductDTO;
}

export default function ProductForm({
  title,
  action,
  categories,
  initialData,
}: ProductFormProps) {
  // State untuk melacak gambar lama yang akan dihapus
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  // State untuk melacak file baru yang dipilih
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Ambil file yang dipilih dan gabungkan dengan yang sudah ada (jika mau akumulatif)
      // Atau ganti saja jika ingin sekali pilih:
      setNewFiles(Array.from(e.target.files));
    }
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleDeleteOldImage = (id: string) => {
    setDeletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  function submitButton() {
    const { pending } = useFormStatus(); //mengambil status otomatis dari form action
  }
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

        <Textarea
          label="Deskripsi Produk"
          name="description"
          defaultValue={initialData?.description ?? ""}
          placeholder="Isi deskripsi produk"
          rows={3}
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

        {/* --- BAGIAN PREVIEW & UPLOAD --- */}
        <div className="space-y-3">
          <label className="block text-[13px] font-semibold text-gray-500 uppercase ml-1">
            Foto Produk
          </label>

          {/* Komponen Preview untuk gambar lama & baru */}
          {(initialData?.images?.length || 0) > 0 || newFiles.length > 0 ? (
            <ImagePreview
              images={initialData?.images || []}
              newFiles={newFiles}
              deletedIds={deletedIds}
              onToggleDelete={toggleDeleteOldImage}
              onRemoveNewFile={removeNewFile}
            />
          ) : (
            <div className="text-[12px] text-gray-400 italic bg-gray-50 p-4 rounded-xl text-center border border-dashed">
              Belum ada foto yang dipilih
            </div>
          )}

          <div className="relative group">
            <input
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold hover:file:bg-blue-100 transition-all cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-400 py-2.5"
          >
            Batal
          </Link>
          {/* GUNAKAN KOMPONEN INI */}
          <SubmitButton isEdit={!!initialData} />
        </div>
      </form>
    </div>
  );
}
