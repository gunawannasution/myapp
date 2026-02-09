"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductRepository } from "../repositories/productRepository";
import { ProductService } from "../services/productServices";

const productService = new ProductService(new ProductRepository());

export async function addProductAction(formData: FormData) {
  await productService.create({
    name: formData.get("name") as string,
    description: formData.get("description") as string | null,
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    categoryId: formData.get("categoryId") as string,
    imageFiles: formData.getAll("images") as File[],
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(formData: FormData) {
  await productService.update(formData.get("productId") as string, {
    name: formData.get("name") as string,
    description: formData.get("description") as string | null,
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    categoryId: formData.get("categoryId") as string,
    imageFiles: formData.getAll("images") as File[],
    imagesToDelete: formData.getAll("imagesToDelete") as string[],
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(id: string) {
  await productService.remove(id);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
