// app/domain/products/productTypes.ts

export type ProductImageDTO = {
  id: string;
  url: string;
};

export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  images: ProductImageDTO[]; // Relasi gambar dari database
};

/**
 * Input untuk membuat produk baru
 * Kita membuang 'id' dan 'images' (DTO), lalu menggantinya dengan 'imageFiles'
 */
export type CreateProductInput = Omit<ProductDTO, "id" | "images"> & {
  imageFiles?: File[]; // Input mentah dari Form (Multipart)
  imageUrls?: string[]; // Hasil proses upload di Service (Path string)
};

/**
 * Input untuk memperbarui produk
 * Menggunakan Partial agar tidak semua field wajib diisi saat update
 */
export type UpdateProductInput = Partial<CreateProductInput> & {
  imagesToDelete?: string[]; // Array ID gambar yang ingin dihapus dari database & disk
};
