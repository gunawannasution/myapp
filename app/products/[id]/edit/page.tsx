import { updateProductAction } from "@/app/actions/productActions";
import Input from "@/app/components/ui/Input";
import { findProductByIdService } from "@/app/services/product.service";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idProduct = Number(id);

  const product = await findProductByIdService(idProduct);
  if (!product) notFound();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>

      <form action={updateProductAction} className="space-y-4">
        <input type="hidden" name="id" value={product.id} />

        <Input
          label="Nama Produk"
          name="nama"
          defaultValue={product.nama}
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
