import {
  CategoriesDTO,
  CreateCategoryInput,
} from "../domain/categories/categoryTypes";

export interface InterfaceCategoryRepo {
  findAll(): Promise<CategoriesDTO[]>;
  findById(id: string): Promise<CategoriesDTO | null>;
  create(data: CreateCategoryInput): Promise<CategoriesDTO>;
  update(id: string, data: UpdateCategoryInput): Promise<CategoriesDTO>;
  delete(id: string): Promise<void>;
}
