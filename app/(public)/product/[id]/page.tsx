import Navbar from "@/app/(public)/_components/Navbar";
import ProductGallery from "@/app/(public)/_components/ProductGallery"; // Import komponen baru
import { ProductRepository } from "@/app/repositories/productRepository";
import { ProductService } from "@/app/services/productServices";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const repo = new ProductService(ProductRepository());
  const product = await repo.findById(id);

  if (!product) notFound();

  // Pastikan nomor diawali 62, tanpa spasi, tanpa tanda +
  const waNumber = "628123456789";

  // Perhatikan posisi ${waNumber} sebelum tanda tanya (?)
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan *${product.name}*`,
  )}`;
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/" className="text-gray-400 hover:text-green-600 text-sm">
            ← Kembali
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* GUNAKAN KOMPONEN GALERI DI SINI */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Sisi Kanan: Informasi Produk */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-green-600 mb-6">
              Rp {product.price?.toLocaleString("id-ID")}
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <p className="text-gray-600">
                {product.description || "Deskripsi tanaman koleksi."}
              </p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              className="w-full py-5 bg-green-600 text-white text-center font-bold rounded-2xl shadow-lg"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
