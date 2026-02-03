import {
  CategoriesDTO,
  CreateCategoryInput,
} from "../domain/categories/categoryTypes";
import { prisma } from "../lib/prisma";
import { InterfaceCategoryRepo } from "./InterfaceCategoryRepo";

export class CategoryRepo implements InterfaceCategoryRepo {
  async findAll(): Promise<CategoriesDTO[]> {
    return await prisma.category.findMany();
  }

  // Koreksi 1: Tambahkan objek 'where' dan gunakan 'string' (kecil)
  async findById(id: string): Promise<CategoriesDTO | null> {
    return await prisma.category.findUnique({
      where: { id },
    });
  }

  async create(data: CreateCategoryInput): Promise<CategoriesDTO> {
    return await prisma.category.create({ data });
  }

  async update(
    id: string,
    data: Partial<CreateCategoryInput>,
  ): Promise<CategoriesDTO> {
    return await prisma.category.update({
      where: { id },
      data,
    });
  }

  // Koreksi 2: Gunakan 'string' (kecil) dan pastikan argumen 'where' benar
  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }
}
