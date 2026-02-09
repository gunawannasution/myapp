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
    return this.repo.findAll();
  }

  async getById(id: string): Promise<ProductDTO | null> {
    return this.repo.findById(id);
  }

  async create(form: {
    name: string;
    description: string | null;
    price: number;
    stock: number;
    categoryId: string;
    imageFiles: File[];
  }): Promise<ProductDTO> {
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
  }

  async remove(id: string): Promise<void> {
    return this.repo.delete(id);
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
