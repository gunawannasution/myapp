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

function sanitizeString(value: FormDataEntryValue | null): string | null {
  if (!value) return null;
  const str = value.toString().trim();
  return str.length > 0 ? str : null;
}

function buildError(message: string): ActionResult {
  return { success: false, error: message };
}

/**
 * ADD CATEGORY
 */
export async function addCategoryAction(
  formData: FormData,
): Promise<ActionResult> {
  try {
    const name = sanitizeString(formData.get("name"));

    if (!name) {
      return buildError("Nama kategori wajib diisi");
    }

    await categoryService.create({ name });
  } catch (error) {
    console.error("[addCategoryAction]", error);
    return buildError("Gagal menyimpan kategori");
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

/**
 * UPDATE CATEGORY
 */
export async function updateCategoryAction(
  formData: FormData,
): Promise<ActionResult> {
  try {
    const id = sanitizeString(formData.get("id"));
    const name = sanitizeString(formData.get("name"));

    if (!id || !name) {
      return buildError("Data tidak lengkap");
    }

    await categoryService.update(id, { name });
  } catch (error) {
    console.error("[updateCategoryAction]", error);
    return buildError("Gagal memperbarui kategori");
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

/**
 * DELETE CATEGORY
 */
export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  try {
    const categoryId = id?.trim();

    if (!categoryId) {
      return buildError("ID kategori tidak valid");
    }

    await categoryService.remove(categoryId);

    
  } catch (error: unknown) {
    console.error("[deleteCategoryAction]", error);

    // Handle Prisma foreign key constraint (P2003)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2003"
    ) {
      return buildError(
        "Tidak dapat menghapus kategori karena masih digunakan oleh produk.",
      );
    }

    return buildError("Gagal menghapus kategori");
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
