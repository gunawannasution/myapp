"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DistributorRepository } from "../repositories/DistributorRepository";
import { DistributorServices } from "../services/DistributorServices";

const distributorService = new DistributorServices(new DistributorRepository());

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
 * CREATE DISTRIBUTOR
 */
export async function createDistributorAction(
  formData: FormData,
): Promise<ActionResult> {
  try {
    const name = sanitizeString(formData.get("name"));

    if (!name) {
      return buildError("Nama distributor wajib diisi");
    }

    await distributorService.create({ name });
  } catch (error) {
    console.error("[createDistributorAction]", error);
    return buildError("Terjadi kesalahan saat membuat distributor");
  }
  revalidatePath("/admin/distributors");
  redirect("/admin/distributors");
}

/**
 * UPDATE DISTRIBUTOR
 */
export async function updateDistributorAction(
  formData: FormData,
): Promise<ActionResult> {
  try {
    const id = sanitizeString(formData.get("distributorId"));
    const name = sanitizeString(formData.get("name"));

    if (!id || !name) {
      return buildError("Data tidak lengkap");
    }

    await distributorService.update(id, { name });
  } catch (error) {
    console.error("[updateDistributorAction]", error);
    return buildError("Terjadi kesalahan saat memperbarui distributor");
  }

  revalidatePath("/admin/distributors");
  redirect("/admin/distributors");
}

/**
 * DELETE DISTRIBUTOR
 */
export async function deleteDistributorAction(
  id: string,
): Promise<ActionResult> {
  try {
    const sanitizedId = id?.trim();

    if (!sanitizedId) {
      return buildError("ID distributor tidak valid");
    }

    await distributorService.remove(sanitizedId);
  } catch (error) {
    console.error("[deleteDistributorAction]", error);
    return buildError("Terjadi kesalahan saat menghapus distributor");
  }
  revalidatePath("/admin/distributors");
  redirect("/admin/distributors");
}
