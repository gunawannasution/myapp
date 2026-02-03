// 1. Gunakan 'string' (kecil) dan tambahkan tanda '='
export type CategoriesDTO = {
  id: string;
  name: string;
};

// 2. Gunakan koma ',' di dalam Omit, bukan titik dua ':'
export type CreateCategoryInput = Omit<CategoriesDTO, "id">;
