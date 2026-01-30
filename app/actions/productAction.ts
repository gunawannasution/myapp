"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductRepository } from "../repositories/productRepository";
import { ProductService } from "../services/productServices";

// Inisialisasi (Bisa ditingkatkan dengan DI Container jika skala besar)
const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);

export async function addProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  await productService.create({ name, price, stock });
  revalidatePath("/products");
  redirect("/products");
}
export async function updateProductAction(formData: FormData) {
  // 1. Ambil data dari form
  const id = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  // 2. Eksekusi Service
  const service = new ProductService(new ProductRepository());
  await service.update(id, { name, price, stock });

  // 3. Update cache UI & pindah halaman
  revalidatePath("/products");
  redirect("/products");
}
export async function deleteProductAction(id: string) {
  await productService.remove(id);
  revalidatePath("/products");
  redirect("/products");
}
