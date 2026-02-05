// app/products/_components/ui/ImagePreview.tsx
"use client";

import Image from "next/image";

interface ImagePreviewProps {
  images: any[]; // Gambar dari database
  newFiles: File[]; // File mentah dari input file
  deletedIds: string[]; // State ID yang akan dihapus
  onToggleDelete: (id: string) => void;
  onRemoveNewFile: (index: number) => void;
}

export default function ImagePreview({
  images,
  newFiles,
  deletedIds,
  onToggleDelete,
  onRemoveNewFile,
}: ImagePreviewProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* 1. PREVIEW GAMBAR LAMA (DARI DATABASE) */}
      {images.map((img) => (
        <div
          key={img.id}
          className="relative aspect-square group overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
        >
          <Image
            src={img.url}
            alt="preview"
            fill
            sizes="100px"
            className={`object-cover transition-all duration-300 ${
              deletedIds.includes(img.id)
                ? "opacity-20 grayscale scale-90"
                : "opacity-100 group-hover:scale-110"
            }`}
          />

          {/* Hidden input agar ID yang dihapus terkirim ke Server Action */}
          {deletedIds.includes(img.id) && (
            <input type="hidden" name="imagesToDelete" value={img.id} />
          )}

          <button
            type="button"
            onClick={() => onToggleDelete(img.id)}
            className="absolute top-1.5 right-1.5 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-100 hover:scale-110 transition-transform"
          >
            {deletedIds.includes(img.id) ? (
              <span className="text-[10px] px-1 text-green-600 font-bold">
                RECOVER
              </span>
            ) : (
              <span className="text-[10px] px-1 text-red-600 font-bold">
                HAPUS
              </span>
            )}
          </button>
        </div>
      ))}

      {/* 2. PREVIEW GAMBAR BARU (AKAN DIUPLOAD) */}
      {newFiles.map((file, index) => {
        // Membuat URL sementara untuk preview
        const objectUrl = URL.createObjectURL(file);
        return (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden border-2 border-blue-200 border-dashed bg-blue-50/30"
          >
            <Image
              src={objectUrl}
              alt="upload preview"
              fill
              sizes="100px"
              className="object-cover"
              onLoadingComplete={() => URL.revokeObjectURL(objectUrl)} // Bersihkan memori
            />
            <button
              type="button"
              onClick={() => onRemoveNewFile(index)}
              className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-lg"
            >
              ✕
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 py-0.5 text-[8px] text-center text-white font-bold">
              NEW
            </div>
          </div>
        );
      })}
    </div>
  );
}
