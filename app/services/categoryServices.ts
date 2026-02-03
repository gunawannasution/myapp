// app/services/categoryServices.ts
import { CreateCategoryInput } from "../domain/categories/categoryTypes";
import { InterfaceCategoryRepo } from "../repositories/categoryRepo"; // Import interface repo kamu

export class CategoryServices {
  // 1. Ganti 'any' dengan Interface agar auto-complete jalan
  constructor(private repository: InterfaceCategoryRepo) {}

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id: string) {
    return await this.repository.findById(id);
  }

  async create(data: CreateCategoryInput) {
    return await this.repository.create(data);
  }

  async update(id: string, data: CreateCategoryInput) {
    // 2. JANGAN kirim { where, data } di sini.
    // Kirim ID dan Data secara terpisah, biarkan Repo yang urus Prisma.
    return await this.repository.update(id, data);
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }
}
