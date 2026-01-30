import { updateProductAction } from "@/app/actions/productAction";
import { ProductRepository } from "@/app/repositories/productRepository";
import { ProductService } from "@/app/services/productServices";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = new ProductService(new ProductRepository());
  const product = await service.getById(id);

  if (!product) return <div>Produk tidak ditemukan</div>;

  return (
    <form action={updateProductAction} className="flex flex-col gap-4">
      {/* Hidden input untuk ID */}
      <input type="hidden" name="productId" value={product.id} />

      <input name="name" defaultValue={product.name} className="border p-2" />
      <input
        name="price"
        name="price"
        type="number"
        defaultValue={product.price}
        className="border p-2"
      />
      <input
        name="stock"
        name="stock"
        type="number"
        defaultValue={product.stock}
        className="border p-2"
      />

      <button type="submit" className="bg-blue-600 text-white p-2">
        Update Product
      </button>
    </form>
  );
}
