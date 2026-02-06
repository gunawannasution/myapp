export type ProductImageDTO = {
  id: string;
  url: string;
};

export type ProductDTO = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  categoryId: string;
  images: ProductImageDTO[];
};

/**
 * Input create = field yang benar-benar dikirim dari UI
 */
export type CreateProductInput = {
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  categoryId: string;
  imageFiles?: File[];
  imageUrls?: string[];
};

/**
 * Input update = Partial dari create + imagesToDelete
 */
export type UpdateProductInput = Partial<CreateProductInput> & {
  imagesToDelete?: string[];
};
