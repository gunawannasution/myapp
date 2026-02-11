// app/admin/products/_components/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg
        ${
          pending
            ? "bg-gray-400 cursor-not-allowed opacity-70 shadow-none"
            : "bg-blue-600 text-white shadow-blue-100 active:scale-95 hover:bg-blue-700"
        }
      `}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Memproses...
        </div>
      ) : isEdit ? (
        "Update Category"
      ) : (
        "Simpan Category"
      )}
    </button>
  );
}
