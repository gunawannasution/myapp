import { updateDistributorAction } from "@/app/actions/distributorAction";
import DistributorForm from "@/app/components/DistributorForm";
import { DistributorRepository } from "@/app/repositories/DistributorRepository";
import { DistributorServices } from "@/app/services/DistributorServices";

export default async function EditDistriborPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = new DistributorServices(new DistributorRepository());
  const distributor = service.getById(id);
  if (!distributor)
    return <div className="text-center mt-10">Kategori tidak ditemukan</div>;

  return (
    <DistributorForm
      title="Edit Distributor"
      action={updateDistributorAction}
      initialData={distributor}
    />
  );
}
