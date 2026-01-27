import { createProductAction } from "@/app/actions/productActions";
import Input from "@/app/components/ui/Input";
import Link from "next/link";

export default function CreateProductPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Tambah Produk</h1>

      <form action={createProductAction} className="space-y-4">
        <Input
          label="Nama Produk"
          name="nama"
          placeholder="Masukkan nama produk..."
          required
        />

        <div className="flex justify-end gap-3">
          <Link href="/products">Batal</Link>
          <button type="submit" className="btn-primary">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
