import { mkdir, unlink, writeFile } from "fs/promises"; // Tambahkan unlink
import path from "path";
import {
  CreateProductInput,
  ProductDTO,
  UpdateProductInput, // Pastikan di-import
} from "../domain/products/productTypes";
import { InterfaceProductRepository } from "../repositories/InterfaceProductRepository";

export class ProductService {
  constructor(private repo: InterfaceProductRepository) {}

  async getAll(): Promise<ProductDTO[]> {
    return await this.repo.findAll();
  }

  async getById(id: string): Promise<ProductDTO | null> {
    return await this.repo.findById(id);
  }

  async create(data: CreateProductInput): Promise<ProductDTO> {
    // 1. LOGIKA BISNIS (Validation)
    if (data.price <= 0) throw new Error("Harga harus lebih dari 0");
    if (data.stock < 0) throw new Error("Stok tidak boleh negatif");

    const imageUrls: string[] = [];

    // 2. PROSES UPLOAD GAMBAR
    if (data.imageFiles && data.imageFiles.length > 0) {
      for (const file of data.imageFiles) {
        if (file.size === 0) continue;

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
        const uploadDir = path.join(process.cwd(), "public/uploads");

        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, fileName), buffer);
        imageUrls.push(`/uploads/${fileName}`);
      }
    }

    // 3. KIRIM KE REPO
    return await this.repo.create({ ...data, imageUrls });
  }

  async update(id: string, data: UpdateProductInput): Promise<ProductDTO> {
    const imageUrls: string[] = [];

    // 1. Proses Upload Gambar Baru
    if (data.imageFiles && data.imageFiles.length > 0) {
      for (const file of data.imageFiles) {
        if (file.size === 0) continue;
        const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
        const uploadDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(uploadDir, fileName), buffer);
        imageUrls.push(`/uploads/${fileName}`);
      }
    }

    // 2. Proses Hapus File Fisik Gambar Lama dari Disk
    if (data.imagesToDelete && data.imagesToDelete.length > 0) {
      for (const imgId of data.imagesToDelete) {
        // Asumsi: Kamu punya method findImageById di Repo untuk cari URL file sebelum dihapus
        const imgRecord = await this.repo.findImageById(imgId);
        if (imgRecord) {
          const filePath = path.join(process.cwd(), "public", imgRecord.url);
          await unlink(filePath).catch(() => null); // Hapus file fisiknya
        }
      }
    }

    return await this.repo.update(id, { ...data, imageUrls });
  }

  async remove(id: string): Promise<void> {
    // Opsional: Sebelum hapus produk, hapus semua gambar fisiknya juga di sini
    return await this.repo.delete(id);
  }
}
