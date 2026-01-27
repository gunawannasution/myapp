import { CreateProductDTO, UpdateProductDTO } from "@/app/DTO/product.dto";
import {
  createProductRepo,
  deleteProductRepo,
  findAllProductsRepo,
  findProductByIdRepo,
  updateProductRepo,
} from "@/app/repositories/productRepository";

/**
 * Helper internal untuk validasi ID
 * (service-level business rule)
 */
function validateId(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("ID tidak valid");
  }
}
export async function getProducts() {
  try {
    const products = await findAllProductsRepo();
    return {
      ok: true,
      data: products,
    };
  } catch (error) {
    console.error("PRODUCT SERVICE ERROR:", error.message);

    return {
      ok: false,
      data: [],
      errorCode: "DB_DOWN",
    };
  }
}
export async function createProductService(dto: CreateProductDTO) {
  if (!dto.nama?.trim()) {
    throw new Error("Nama produk wajib diisi");
  }

  return createProductRepo({
    nama: dto.nama.trim(),
  });
}

export async function updateProductService(id: number, dto: UpdateProductDTO) {
  validateId(id);

  if (!dto.nama?.trim()) {
    throw new Error("Nama produk tidak boleh kosong");
  }

  return updateProductRepo(id, {
    nama: dto.nama.trim(),
  });
}

export async function deleteProductService(id: number) {
  validateId(id);

  return deleteProductRepo(id);
}

export async function findProductByIdService(id: number) {
  validateId(id);

  return findProductByIdRepo(id);
}
