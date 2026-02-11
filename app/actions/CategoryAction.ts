"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CategoryRepo } from "../repositories/categoryRepo";
import { CategoryServices } from "../services/categoryServices";

const categoryService = new CategoryServices(new CategoryRepo());

type ActionResult = {
  success: boolean;
  error?: string;
};

export async function addCategoryAction(
  formData: FormData,
): Promise<ActionResult> {
  const name = formData.get("name")?.toString();
  if (!name) return { error: "Nama wajib diisi" };

  try {
    await categoryService.create({ name });

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
  } catch (error) {
    console.error("[createDistributorAction]", error);
    return { success: false, error: "Gagal menyimpan distributor" };
  }
}

export async function updateCategoryAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();

  if (!id || !name) return { error: "Data tidak lengkap" };

  try {
    await categoryService.update(id, { name });
  } catch (e) {
    return { error: "Gagal memperbarui kategori", e };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: string) {
  if (!id) return { error: "ID Kosong" };

  try {
    await categoryService.remove(id);
    revalidatePath("/admin/categories");
    redirect("/admin/categories");
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2003"
    ) {
      return {
        error: "Gagal hapus! Kategori ini masih digunakan oleh produk lain.",
      };
    }

    return { error: "Gagal menghapus kategori" };
  }
}
