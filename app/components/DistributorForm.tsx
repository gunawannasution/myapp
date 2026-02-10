import Input from "@/app/components/ui/Input";
import Link from "next/link";
import SubmitButton from "../admin/categories/create/SubmitButton";
import { DistributorDTO } from "../domain/distributor/distributorTypes";

interface DistributorFormProps {
  title: string;
  action: (formData: FormData) => Promise<void>;
  initialData?: DistributorDTO;
}
export default function DistributorForm({
  title,
  action,
  initialData,
}: DistributorFormProps) {
  return (
    // Penjelasan perubahan:
    // 1. w-full: Agar di layar HP lebarnya memenuhi layar.
    // 2. max-w-lg: Memperlebar sedikit dari md ke lg (sekitar 512px) agar form tidak terlalu sempit.
    // 3. mx-auto: Menjaga posisi tetap di tengah.
    <div className="w-full max-w-lg mx-auto mt-6 lg:mt-10 p-6 lg:p-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Pastikan nama distributor belum ada didatabase.
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
          <SubmitButton isEdit={!!initialData} />
        </div>
      </form>
    </div>
  );
}
