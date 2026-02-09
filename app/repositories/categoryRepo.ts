import { CreateCategoryInput } from "../domain/categories/categoryTypes";
import { prisma } from "../lib/prisma";
import { InterfaceCategoryRepo } from "./InterfaceCategoryRepo";

export class CategoryRepo implements InterfaceCategoryRepo {
  async findAll() {
    return prisma.category.findMany();
  }

  async findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  }

  async create(data: CreateCategoryInput) {
    return prisma.category.create({ data });
  }

  async update(id: string, data: CreateCategoryInput) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await prisma.category.delete({ where: { id } });
  }
}
