// app/products/_components/ImagePreview.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImagePreview({ images }: { images: any[] }) {
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const toggleDelete = (id: string) => {
    setDeletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative aspect-square group overflow-hidden rounded-xl border border-gray-100"
        >
          <Image
            src={img.url}
            alt="preview"
            fill // Pakai fill agar mengikuti ukuran parent (aspect-square)
            sizes="(max-width: 768px) 33vw, 100px"
            className={`object-cover transition-all duration-300 ${
              deletedIds.includes(img.id)
                ? "opacity-20 grayscale scale-90"
                : "opacity-100 group-hover:scale-110"
            }`}
          />

          {deletedIds.includes(img.id) && (
            <input type="hidden" name="imagesToDelete" value={img.id} />
          )}

          <button
            type="button"
            onClick={() => toggleDelete(img.id)}
            className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md transition-all hover:scale-110"
          >
            {deletedIds.includes(img.id) ? (
              <span className="text-green-600 text-xs font-bold">RECOVERY</span>
            ) : (
              <span className="text-red-600 text-xs font-bold">DELETE</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
