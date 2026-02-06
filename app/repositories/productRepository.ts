import {
  CreateProductInput,
  ProductDTO,
} from "../domain/products/productTypes";
import { prisma } from "../lib/prisma";
import { UpdateProductInput } from "../types/typeProduct";
import { InterfaceProductRepository } from "./InterfaceProductRepository";

export class ProductRepository implements InterfaceProductRepository {
  // Mengambil semua produk beserta gambarnya
  async findAll(): Promise<ProductDTO[]> {
    try {
      return await prisma.product.findMany({
        include: { images: true }, // Mengambil data relasi gambar
      });
    } catch (error) {
      console.error("Database Down", error);
      return [];
    }
  }

  // Mencari produk berdasarkan ID (digunakan untuk detail & edit)
  async findById(id: string): Promise<ProductDTO | null> {
    return await prisma.product.findUnique({
      where: { id },
      include: { images: true }, // include gambar supaya preview muncul saat edit
    });
  }

  // Membuat produk baru dan simpan URL gambar ke tabel Image
  async create(data: CreateProductInput): Promise<ProductDTO> {
    return await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        images: {
          // Mapping array string URL menjadi objek create Prisma
          create: data.imageUrls?.map((url) => ({ url })) || [],
        },
      },
      include: { images: true },
    });
  }

  // Update data produk, hapus gambar terpilih, dan tambah gambar baru
  async update(id: string, data: UpdateProductInput): Promise<ProductDTO> {
    return await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        description: data.description ?? undefined,
        images: {
          deleteMany: data.imagesToDelete?.length
            ? { id: { in: data.imagesToDelete } }
            : undefined,
          create: data.imageUrls?.map((url) => ({ url })) || [],
        },
      },
      include: { images: true },
    });
  }

  // Menghapus produk (tabel Image akan ikut terhapus karena Cascade di Schema)
  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  /**
   * FUNGSI BARU: Ambil satu gambar spesifik
   * Sekarang sudah berada di dalam class ProductRepository
   * Digunakan Service untuk cari URL file sebelum dihapus dari disk
   */
  async findImageById(id: string): Promise<{ id: string; url: string } | null> {
    return await prisma.image.findUnique({
      where: { id },
      select: {
        id: true,
        url: true,
      },
    });
  }
}
