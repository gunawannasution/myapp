"use client";

interface DeleteButtonProps {
  action: (formData: FormData) => void | Promise<void>;
}

export default function DeleteButton({ action }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Yakin ingin menghapus data ini?")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
