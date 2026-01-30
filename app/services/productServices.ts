import { CreateProductInput } from "../domain/products/productTypes";

export class ProductService {
  private repo: any;
  constructor(repo: any) {
    this.repo = repo;
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    return await this.repo.findById(id);
  }

  async create(data: CreateProductInput) {
    if (data.price <= 0) throw new Error("Harga harus lebih dari 0");
    if (data.stock < 0) throw new Error("Stok tidak boleh negatif");
    return this.repo.create(data);
  }

  async update(id: string, data: any) {
    return await this.repo.update(id, data);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }
}
