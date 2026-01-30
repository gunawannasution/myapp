import { ProductDTO } from "../domain/products/productTypes";
import { prisma } from "../lib/prisma";
import { InterfaceProductRepository } from "./InterfaceProductRepository";
export class ProductRepository implements InterfaceProductRepository {
  async findAll(): Promise<ProductDTO[]> {
    return await prisma.product.findMany();
  }
  async findById(id: string) {
    // Pastikan prisma diimport
    return await prisma.product.findUnique({
      where: { id },
    });
  }
  async create(data: CreateProductInput): Promise<ProductDTO> {
    return await prisma.product.create({ data });
  }

  async update(id: string, data: any) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}
