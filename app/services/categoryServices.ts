import { CreateCategoryInput } from "../domain/categories/categoryTypes";
import { InterfaceCategoryRepo } from "../repositories/InterfaceCategoryRepo";

export class CategoryServices {
  constructor(private repository: InterfaceCategoryRepo) {}

  getAll() {
    return this.repository.findAll();
  }

  getById(id: string) {
    return this.repository.findById(id);
  }

  create(data: CreateCategoryInput) {
    return this.repository.create(data);
  }

  update(id: string, data: CreateCategoryInput) {
    return this.repository.update(id, data);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
