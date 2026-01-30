export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  stock: number;
};
export type CreateProductInput = Omit<ProductDTO, "id">;
