/**
 * CREATE → dari Service ke Repository
 * File SUDAH DI-UPLOAD
 */
export interface CreateProductInput {
  name: string;
  description: string | null;
  price: number;
  stock: number;
  categoryId: string;
  imageUrls: string[];
}

/**
 * UPDATE → dari Service ke Repository
 */
export interface UpdateProductInput {
  name?: string;
  description?: string | null;
  price?: number;
  stock?: number;
  categoryId?: string;
  imageUrls?: string[];
  imagesToDelete?: string[];
}

/**
 * DATA UNTUK UI
 */
export interface ProductDTO {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  categoryId: string;
  images: {
    id: string;
    url: string;
  }[];
}
