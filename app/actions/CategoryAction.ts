"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CategoryRepo } from "../repositories/categoryRepo";
import { CategoryServices } from "../services/categoryServices";

const categoryRepo = new CategoryRepo();
const categoryService = new CategoryServices(categoryRepo);

export async function addCategoryAction(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) return { error: "Nama wajib diisi" };

  try {
    await categoryService.create({ name });
  } catch (e) {
    return { error: "Gagal menambah kategori" };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();

  if (!id || !name) return { error: "Data tidak lengkap" };

  try {
    await categoryService.update(id, { name });
  } catch (e) {
    return { error: "Gagal memperbarui kategori" };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: string) {
  if (!id) return { error: "ID Kosong" };

  let isSuccess = false;

  try {
    await categoryService.remove(id);
    isSuccess = true;
    revalidatePath("/admin/categories");
  } catch (e: any) {
    // Menangkap error foreign key dari Prisma (P2003)
    if (e.code === "P2003") {
      return {
        error: "Gagal hapus! Kategori ini masih digunakan oleh produk lain.",
      };
    }
    return { error: "Gagal menghapus kategori" };
  }

  // Redirect ditaruh di luar catch agar tidak dianggap sebagai error oleh Next.js
  if (isSuccess) {
    redirect("/admin/categories");
  }
}
