import {
  CreateProductInput,
  ProductDTO,
  UpdateProductInput,
} from "../domain/products/productTypes";
import { prisma } from "../lib/prisma";
import { InterfaceProductRepository } from "./InterfaceProductRepository";

export class ProductRepository implements InterfaceProductRepository {
  async findAll(): Promise<ProductDTO[]> {
    return prisma.product.findMany({
      include: { images: true },
    });
  }

  async findById(id: string): Promise<ProductDTO | null> {
    return prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
  }

  async create(data: CreateProductInput): Promise<ProductDTO> {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        images: {
          create: data.imageUrls.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });
  }

  async update(id: string, data: UpdateProductInput): Promise<ProductDTO> {
    return prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description ?? undefined,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        images: {
          deleteMany: data.imagesToDelete?.length
            ? { id: { in: data.imagesToDelete } }
            : undefined,
          create: data.imageUrls?.map((url) => ({ url })) ?? [],
        },
      },
      include: { images: true },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  async findImageById(id: string) {
    return prisma.image.findUnique({
      where: { id },
      select: { id: true, url: true },
    });
  }
}
