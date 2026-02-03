import {
  CreateProductInput,
  ProductDTO,
  UpdateProductInput, // Gunakan ini untuk konsistensi tipe data update
} from "../domain/products/productTypes";

export interface InterfaceProductRepository {
  findAll(): Promise<ProductDTO[]>;

  findById(id: string): Promise<ProductDTO | null>;

  // Menemukan URL gambar untuk dihapus dari disk
  findImageById(id: string): Promise<{ id: string; url: string } | null>;

  create(data: CreateProductInput): Promise<ProductDTO>;

  // Menggunakan UpdateProductInput karena mengandung field 'imagesToDelete'
  update(id: string, data: UpdateProductInput): Promise<ProductDTO>;

  delete(id: string): Promise<void>;
}
