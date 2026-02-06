import Navbar from "./(public)/_components/Navbar";
import ProductCard from "./(public)/_components/ProductCard";
import { ProductRepository } from "./repositories/productRepository";

export default async function HomePage() {
  const repo = new ProductRepository();
  const products = await repo.findAll();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="mb-16 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
            Bawa Kemewahan Alam <br />{" "}
            <span className="text-green-600">Ke Dalam Hunian.</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-medium italic">
            Koleksi eksklusif Anthurium, Philodendron, dan tanaman hias kolektor
            dengan kualitas grade A untuk estetika ruang Anda.
          </p>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 italic">
              Belum ada produk yang tersedia.
            </div>
          )}
        </section>
      </main>

      {/* Footer Sederhana */}
      <footer className="border-t border-gray-100 py-12 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Hapesindo Store. All rights reserved.
      </footer>
    </div>
  );
}
