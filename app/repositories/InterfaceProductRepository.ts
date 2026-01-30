import {
  CreateProductInput,
  ProductDTO,
} from "../domain/products/productTypes";

export interface InterfaceProductRepository {
  findAll(): Promise<ProductDTO[]>;
  findById(id: string): Promise<ProductDTO | null>;
  create(data: CreateProductInput): Promise<ProductDTO>;

  //Partial<Product>: Membuat semua properti menjadi opsional (boleh ada, boleh tidak).
  // (Cocok untuk Update/Patch)
  update(id: string, data: Partial<CreateProductInput>): Promise<ProductDTO>;
  delete(id: string): Promise<void>;
}
