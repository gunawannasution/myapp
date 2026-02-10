"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DistributorRepository } from "../repositories/DistributorRepository";
import { DistributorServices } from "../services/DistributorServices";

const service = new DistributorServices(new DistributorRepository());

export async function createDistributorAction(
  formData: FormData,
): Promise<void> {
  try {
    await service.create({
      name: formData.get("name") as string,
    });

    revalidatePath("/admin/distributors");
    redirect("/admin/distributors");
  } catch (error) {
    console.error("[createDistributorAction]", error);
    throw new Error("Gagal menyimpan distributor");
  }
}

export async function updateDistributorAction(
  formData: FormData,
): Promise<void> {
  try {
    await service.update(formData.get("distributorId") as string, {
      name: formData.get("name") as string,
    });

    revalidatePath("/admin/distributors");
    redirect("/admin/distributors");
  } catch (error) {
    console.error("[updateDistributorAction]", error);
    throw new Error("Gagal memperbarui distributor");
  }
}

export async function deleteDistributorAction(
  formData: FormData,
): Promise<void> {
  try {
    await service.delete(formData.get("distributorId") as string);

    revalidatePath("/admin/distributors");
  } catch (error) {
    console.error("[deleteDistributorAction]", error);
    throw new Error("Gagal menghapus distributor");
  }
}
