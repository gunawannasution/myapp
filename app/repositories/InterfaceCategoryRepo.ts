import {
  CategoriesDTO,
  CreateCategoryInput,
} from "../domain/categories/categoryTypes";

export interface InterfaceCategoryRepo {
  findAll(): Promise<CategoriesDTO[]>;

  // Gunakan 'string' huruf kecil
  findById(id: string): Promise<CategoriesDTO | null>;

  create(data: CreateCategoryInput): Promise<CategoriesDTO>;

  update(
    id: string,
    data: Partial<CreateCategoryInput>,
  ): Promise<CategoriesDTO>;

  // Gunakan 'string' huruf kecil
  delete(id: string): Promise<void>;
}
