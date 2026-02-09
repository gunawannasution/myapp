import { CreateCategoryInput } from "../domain/categories/categoryTypes";

export interface InterfaceCategoryRepo {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  create(data: CreateCategoryInput): Promise<any>;
  update(id: string, data: CreateCategoryInput): Promise<any>;
  delete(id: string): Promise<void>;
}
