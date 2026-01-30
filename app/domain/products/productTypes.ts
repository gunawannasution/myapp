export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  stock: number;
};
//omit membuang properti yang sudah ada,
//karena ini creat maka id di buang, id dibuat oleh db otomatis
// Mengambil semua dari Product, KECUALI 'id'
export type CreateProductInput = Omit<ProductDTO, "id">;
