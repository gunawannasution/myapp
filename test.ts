// test.ts
import { handleCreateProduct } from "./app/actions/product.action.ts";

async function runTest() {
  console.log("--- Mencoba Create Data ---");

  // Simulasi input dari user/form
  const inputUser = { nama: "Monitor Gaming 2026" };

  // Panggil Action
  const result = await handleCreateProduct(inputUser);

  if (result.success) {
    console.log("✅ Berhasil Simpan ke MySQL:", result.data);
  } else {
    console.log("❌ Gagal Simpan:", result.error);
  }
}

runTest();
