"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductRepository } from "../repositories/productRepository";
import { ProductService } from "../services/productServices";

const productService = new ProductService(new ProductRepository());

type ActionResult = {
  success: boolean;
  error?: string;
};

function sanitizeString(value: FormDataEntryValue | null): string | null {
  if (!value) return null;
  const str = value.toString().trim();
  return str.length > 0 ? str : null;
}

function parseNumber(value: FormDataEntryValue | null): number | null {
  if (!value) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function parseFiles(values: FormDataEntryValue[]): File[] {
  return values.filter((v): v is File => v instanceof File && v.size > 0);
}

function buildError(message: string): ActionResult {
  return { success: false, error: message };
}

/**
 * ADD PRODUCT
 */
export async function addProductAction(
  formData: FormData,
): Promise<ActionResult> {
  try {
    const name = sanitizeString(formData.get("name"));
    const description = sanitizeString(formData.get("description"));
    const price = parseNumber(formData.get("price"));
    const stock = parseNumber(formData.get("stock"));
    const categoryId = sanitizeString(formData.get("categoryId"));
    const imageFiles = parseFiles(formData.getAll("images"));

    if (!name) return buildError("Nama produk wajib diisi");
    if (price === null || price < 0) return buildError("Harga tidak valid");
    if (stock === null || stock < 0) return buildError("Stok tidak valid");
    if (!categoryId) return buildError("Kategori wajib dipilih");

    await productService.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageFiles,
    });
  } catch (error) {
    console.error("[addProductAction]", error);
    return buildError("Terjadi kesalahan saat menambahkan produk");
  }
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

/**
 * UPDATE PRODUCT
 */
export async function updateProductAction(
  formData: FormData,
): Promise<ActionResult> {
  try {
    const productId = sanitizeString(formData.get("productId"));
    const name = sanitizeString(formData.get("name"));
    const description = sanitizeString(formData.get("description"));
    const price = parseNumber(formData.get("price"));
    const stock = parseNumber(formData.get("stock"));
    const categoryId = sanitizeString(formData.get("categoryId"));
    const imageFiles = parseFiles(formData.getAll("images"));
    const imagesToDelete = formData
      .getAll("imagesToDelete")
      .map((v) => v.toString());

    if (!productId) return buildError("ID produk tidak valid");
    if (!name) return buildError("Nama produk wajib diisi");
    if (price === null || price < 0) return buildError("Harga tidak valid");
    if (stock === null || stock < 0) return buildError("Stok tidak valid");
    if (!categoryId) return buildError("Kategori wajib dipilih");

    await productService.update(productId, {
      name,
      description,
      price,
      stock,
      categoryId,
      imageFiles,
      imagesToDelete,
    });
  } catch (error) {
    console.error("[updateProductAction]", error);
    return buildError("Terjadi kesalahan saat memperbarui produk");
  }
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

/**
 * DELETE PRODUCT
 */
export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    const productId = id?.trim();
    if (!productId) return buildError("ID produk tidak valid");

    await productService.remove(productId);
  } catch (error) {
    console.error("[deleteProductAction]", error);
    return buildError("Terjadi kesalahan saat menghapus produk");
  }
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
