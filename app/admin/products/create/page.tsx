import { addProductAction } from "@/app/actions/productAction";
import ProductForm from "@/app/components/ProductForm";
import { CategoryRepo } from "@/app/repositories/categoryRepo";
import { CategoryServices } from "@/app/services/categoryServices";

export default async function CreateProductPage() {
  const cateServices = new CategoryServices(new CategoryRepo());
  const categories = await cateServices.getAll();

  return (
    <ProductForm
      title="Tambah Produk"
      action={addProductAction}
      categories={categories}
    />
  );
}
