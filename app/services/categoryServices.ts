import { CategoriesDTO } from "../domain/categories/categoryTypes";
import { InterfaceCategoryRepo } from "../repositories/InterfaceCategoryRepo";

export class CategoryServices {
  constructor(private repository: InterfaceCategoryRepo) {}

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    return this.repository.findById(id);
  }

  async create(form: { name: string }): Promise<CategoriesDTO> {
    const payload: CreateProductInput = {
      name: form.name,
    };
    return this.repository.create(payload);
  }

  async update(id: string, form: { name?: string }): Promise<CategoriesDTO> {
    return this.repository.update(id, {
      name: form.name,
    });
  }

  async remove(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
