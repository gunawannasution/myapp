"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductRepository } from "../repositories/productRepository";
import { ProductService } from "../services/productServices";

/**
 * Inisialisasi Singleton
 * Menggunakan satu instance untuk efisiensi koneksi dan memori
 */
const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);

export async function addProductAction(formData: FormData) {
  const imageFiles = formData.getAll("images") as File[];
  let isSuccess = false;

  try {
    await productService.create({
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      categoryId: formData.get("categoryId") as string,
      imageFiles: imageFiles,
    });
    isSuccess = true;
  } catch (error) {
    console.error("Add Product Error:", error);
    return { error: "Gagal menyimpan produk. Pastikan semua data benar." };
  }

  // Redirect ditaruh di luar try-catch karena redirect() melempar error internal Next.js
  if (isSuccess) {
    revalidatePath("/products");
    redirect("/products");
  }
}

export async function updateProductAction(formData: FormData) {
  const id = formData.get("productId") as string;
  const imagesToDelete = formData.getAll("imagesToDelete") as string[];
  const imageFiles = formData.getAll("images") as File[];
  let isSuccess = false;

  if (!id) return { error: "ID Produk tidak ditemukan" };

  try {
    await productService.update(id, {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      categoryId: formData.get("categoryId") as string,
      imageFiles,
      imagesToDelete,
    });
    isSuccess = true;
  } catch (error) {
    console.error("Update Product Error:", error);
    return { error: "Gagal memperbarui produk." };
  }

  if (isSuccess) {
    revalidatePath("/products");
    redirect("/products");
  }
}

export async function deleteProductAction(id: string) {
  // Ubah ini
  if (typeof id !== "string") return { error: "ID tidak valid" };

  let isSuccess = false;
  try {
    await productService.remove(id);
    isSuccess = true;
  } catch (error) {
    return { error: "Gagal menghapus produk" };
  }

  if (isSuccess) {
    revalidatePath("/products");
    redirect("/products");
  }
}
