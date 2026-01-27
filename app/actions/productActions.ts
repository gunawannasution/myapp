"use server";

import {
  createProductService,
  deleteProductService,
  updateProductService,
} from "@/app/services/product.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProductAction(formData: FormData) {
  const nama = String(formData.get("nama") ?? "");

  await createProductService({ nama });

  revalidatePath("/products");
  redirect("/products");
}

export async function updateProductAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const nama = String(formData.get("nama") ?? "");

  await updateProductService(id, { nama });

  revalidatePath("/products");
  redirect("/products");
}

export async function deleteProductAction(id: number) {
  await deleteProductService(id);

  revalidatePath("/products");
  redirect("/products");
}
