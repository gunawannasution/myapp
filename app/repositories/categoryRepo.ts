import {
  CategoriesDTO,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../domain/categories/categoryTypes";
import { prisma } from "../lib/prisma";
import { InterfaceCategoryRepo } from "./InterfaceCategoryRepo";

export class CategoryRepo implements InterfaceCategoryRepo {
  async findAll(): Promise<CategoriesDTO[]> {
    return prisma.category.findMany();
  }

  async findById(id: string): Promise<CategoriesDTO> {
    return prisma.category.findUnique({ where: { id } });
  }

  async create(data: CreateCategoryInput): Promise<CategoriesDTO> {
    return prisma.category.create({ data });
  }

  async update(id: string, data: UpdateCategoryInput): Promise<CategoriesDTO> {
    return prisma.category.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }
}
