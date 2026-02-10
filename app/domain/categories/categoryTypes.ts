// 1. Gunakan 'string' (kecil) dan tambahkan tanda '='
export interface CategoriesDTO {
  id: string;
  name: string;
}

export interface CreateCategoryInput {
  name: string;
}

export interface UpdateCategoryInput {
  name?: string;
}
// 2. Gunakan koma ',' di dalam Omit, bukan titik dua ':'
// export type CreateCategoryInput = Omit<CategoriesDTO, "id">;
