import Input from "@/app/components/ui/Input";
import Link from "next/link";
import { DistributorDTO } from "../domain/distributor/distributorTypes";
import SubmitButton from "./ui/SubmitButton";

interface DistributorFormProps {
  title: string;
  action: ((formData: FormData) => void) | undefined;
  initialData?: DistributorDTO;
}

export default function DistributorForm({
  title,
  action,
  initialData,
}: DistributorFormProps) {
  return (
    <div className="w-full max-w-lg mx-auto mt-6 lg:mt-10 p-6 lg:p-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Pastikan nama distributor belum ada di database.
        </p>
      </div>

      <form action={action} className="space-y-7">
        {initialData?.id && (
          <input type="hidden" name="distributorId" value={initialData.id} />
        )}

        <Input
          label="Nama Distributor"
          name="name"
          defaultValue={initialData?.name}
          placeholder="Contoh: PT Angin Ribut Berhembus..."
          required
        />

        <div className="flex items-center justify-end gap-6 pt-4 border-t border-gray-50">
          <Link
            href="/admin/distributors"
            className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-all"
          >
            Batal
          </Link>

          <SubmitButton
            label={initialData ? "Update Distributor" : "Simpan Distributor"}
          />
        </div>
      </form>
    </div>
  );
}
