"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DistributorRepository } from "../repositories/DistributorRepository";
import { DistributorServices } from "../services/DistributorServices";

const service = new DistributorServices(new DistributorRepository());

type ActionResult = {
  success: boolean;
  error?: string;
};

export async function createDistributorAction(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const name = formData.get("name")?.toString();

  if (!name) {
    return { success: false, error: "Nama Distributor wajib diisi" };
  }

  await service.create({ name });

  revalidatePath("/admin/distributors");
  redirect("/admin/distributors");
}

export async function updateDistributorAction(
  formData: FormData,
): Promise<ActionResult> {
  const id = formData.get("distributorId")?.toString();
  const name = formData.get("name")?.toString();

  if (!id || !name) {
    return { success: false, error: "Data Tidak Lengkap" };
  }

  try {
    await service.update(id, { name });

    revalidatePath("/admin/distributors");
    redirect("/admin/distributors");
  } catch (error) {
    console.error("[updateDistributorAction]", error);
    return { success: false, error: "Gagal memperbarui distributor" };
  }
}

export async function deleteDistributorAction(
  formData: FormData,
): Promise<ActionResult> {
  const id = formData.get("distributorId")?.toString();

  if (!id) {
    return { success: false, error: "ID tidak valid" };
  }

  try {
    await service.delete(id);

    revalidatePath("/admin/distributors");
    redirect("/admin/distributors");
  } catch (error) {
    console.error("[deleteDistributorAction]", error);
    return { success: false, error: "Gagal menghapus distributor" };
  }
}
