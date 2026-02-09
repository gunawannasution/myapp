import {
  CreateProductInput,
  ProductDTO,
  UpdateProductInput,
} from "../domain/products/productTypes";

/**
 * KONTRAK Repository
 * Service hanya bergantung pada interface ini
 */
export interface InterfaceProductRepository {
  findAll(): Promise<ProductDTO[]>;

  findById(id: string): Promise<ProductDTO | null>;

  findImageById(id: string): Promise<{ id: string; url: string } | null>;

  create(data: CreateProductInput): Promise<ProductDTO>;

  update(id: string, data: UpdateProductInput): Promise<ProductDTO>;

  delete(id: string): Promise<void>;
}
