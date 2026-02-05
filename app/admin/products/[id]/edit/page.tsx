// app/products/[id]/edit/page.tsx
import { updateProductAction } from "@/app/actions/productAction";
import ProductForm from "@/app/components/ProductForm";
import { CategoryRepo } from "@/app/repositories/categoryRepo"; // Tambahkan import ini
import { ProductRepository } from "@/app/repositories/productRepository";
import { CategoryServices } from "@/app/services/categoryServices";
import { ProductService } from "@/app/services/productServices";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Inisialisasi Product Service
  const productService = new ProductService(new ProductRepository());
  const product = await productService.getById(id);

  // PERBAIKAN DI SINI: Inisialisasi Category Service
  const categoryRepo = new CategoryRepo();
  const categoryService = new CategoryServices(categoryRepo);
  const categories = await categoryService.getAll();

  if (!product) return <div>Produk tidak ditemukan</div>;

  return (
    <ProductForm
      title="Edit Produk"
      action={updateProductAction}
      categories={categories}
      initialData={product}
    />
  );
}
