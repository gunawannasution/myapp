import {
  CreateProductInput,
  ProductDTO,
} from "../domain/products/productTypes";
import { prisma } from "../lib/prisma";
import { InterfaceProductRepository } from "./InterfaceProductRepository";

export class ProductRepository implements InterfaceProductRepository {
  // async findAll(): Promise<ProductDTO[]> {
  //   return await prisma.product.findMany();
  // }

  async findAll(): Promise<ProductDTO[]> {
    return await prisma.product.findMany({
      include: { images: true }, // WAJIB: supaya data gambar ikut ketarik
    });
  }

  async findById(id: string): Promise<ProductDTO | null> {
    // Tambahkan type di sini
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  // async create(data: CreateProductInput): Promise<ProductDTO> {
  //   return await prisma.product.create({ data });
  // }
  async create(data: CreateProductInput): Promise<ProductDTO> {
    return await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        images: {
          // Membuat record di tabel ProductImage secara otomatis
          create: data.imageUrls?.map((url) => ({ url })) || [],
        },
      },
      include: { images: true },
    });
  }

  async update(id: string, data: any) {
    return await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        images: {
          // Hapus record gambar yang diminta
          deleteMany:
            data.imagesToDelete?.map((imgId: string) => ({ id: imgId })) || [],
          // Tambah record gambar baru
          create: data.imageUrls?.map((url: string) => ({ url })) || [],
        },
      },
      include: { images: true },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}
