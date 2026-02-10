import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import {
  CreateProductInput,
  ProductDTO,
} from "../domain/products/productTypes";
import { InterfaceProductRepository } from "../repositories/InterfaceProductRepository";

export class ProductService {
  constructor(private repo: InterfaceProductRepository) {}

  async getAll(): Promise<ProductDTO[]> {
    try {
      return await this.repo.findAll();
    } catch (error) {
      console.error("[ProductService.getAll] DB ERROR:", error);
      return []; // fallback agar UI tetap hidup
    }
  }

  async getById(id: string): Promise<ProductDTO | null> {
    try {
      return this.repo.findById(id);
    } catch (error) {
      console.error("[ProductService.getById] DB ERROR", error);
      return [];
    }
  }

  async create(form: {
    name: string;
    description: string | null;
    price: number;
    stock: number;
    categoryId: string;
    imageFiles: File[];
  }): Promise<ProductDTO> {
    try {
      if (form.price <= 0) throw new Error("Harga tidak valid");

      const imageUrls = await this.uploadImages(form.imageFiles);

      const payload: CreateProductInput = {
        name: form.name,
        description: form.description,
        price: form.price,
        stock: form.stock,
        categoryId: form.categoryId,
        imageUrls,
      };

      return this.repo.create(payload);
    } catch (error) {
      console.error("[ProductService.create]", error);
      throw new Error("Gagal membuat produk");
    }
  }

  async update(
    id: string,
    form: {
      name?: string;
      description?: string | null;
      price?: number;
      stock?: number;
      categoryId?: string;
      imageFiles?: File[];
      imagesToDelete?: string[];
    },
  ): Promise<ProductDTO> {
    try {
      const imageUrls = form.imageFiles
        ? await this.uploadImages(form.imageFiles)
        : undefined;

      if (form.imagesToDelete?.length) {
        for (const imgId of form.imagesToDelete) {
          const img = await this.repo.findImageById(imgId);
          if (img) {
            await unlink(path.join(process.cwd(), "public", img.url)).catch(
              () => null,
            );
          }
        }
      }

      return this.repo.update(id, {
        name: form.name,
        description: form.description,
        price: form.price,
        stock: form.stock,
        categoryId: form.categoryId,
        imageUrls,
        imagesToDelete: form.imagesToDelete,
      });
    } catch (error) {
      throw new Error("Gagal update produk");
      console.error("[ProductService.update]", error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.repo.delete(id);
    } catch (error) {
      console.error("[ProductService.remove]", error);
      throw new Error("Gagal menghapus produk");
    }
  }

  private async uploadImages(files: File[]): Promise<string[]> {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;

      await writeFile(path.join(uploadDir, fileName), buffer);
      urls.push(`/uploads/${fileName}`);
    }

    return urls;
  }
}
