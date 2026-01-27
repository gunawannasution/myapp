export interface ProductType {
  id: number;
  nama: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  nama: string;
}
export type UpdateProductInput = Partial<CreateProductInput>;
