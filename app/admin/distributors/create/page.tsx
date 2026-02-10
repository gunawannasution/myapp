import { createDistributorAction } from "@/app/actions/distributorAction";
import DistributorForm from "@/app/components/DistributorForm";

export default function CreateDistributorPage() {
  return (
    <DistributorForm
      title="Tambah Distributor"
      action={createDistributorAction}
    />
  );
}
