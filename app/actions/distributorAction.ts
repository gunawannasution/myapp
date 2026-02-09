import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DistibutorRepository } from "../repositories/DistributorRepository";
import { DistributorServices } from "../services/DistributorServices";

const service = new DistributorServices(new DistibutorRepository());
export async function createDistributorAction(formData: FormData) {
  try {
    await service.create({
      name: formData.get("name") as string,
      // email: formData.get("name") as string,
      // phone: formData.get("name") as string,
      // address: formData.get("name") as string,
    });
    revalidatePath("/admin/distributors");
    redirect("/admin/distributors");
  } catch (error) {}
 
}

export async function updateDistributorAction(id: string, formData: FormData) {
  try {
    await service.update(id,{
      name: formData.get("name") as string;
    })
    revalidatePath("/admin/distributors");
    redirect("/admin/distributors");
  } catch (error) {
    
  }
}
