"use client"; // Wajib agar bisa interaktif

import { useState } from "react";

export default function ProductGallery({
  images,
  productName,
}: {
  images: any[];
  productName: string;
}) {
  // State untuk menyimpan URL gambar yang sedang ditampilkan di layar besar
  const [activeImage, setActiveImage] = useState(
    images[0]?.url || "/placeholder.jpg",
  );

  return (
    <div className="space-y-4">
      {/* Gambar Utama (Besar) */}
      <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
        <img
          src={activeImage}
          alt={productName}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* Thumbnail (Gambar Kecil yang bisa diklik) */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setActiveImage(img.url)} // Ganti gambar utama saat diklik
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === img.url
                  ? "border-green-600 scale-95"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img.url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
