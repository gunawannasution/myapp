import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  // Ambil URL dari array images hasil query Prisma include
  const displayImage =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder.jpg"; // Gambar cadangan jika tidak ada foto

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={displayImage}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-green-600 font-semibold mt-1">
            Rp {product.price?.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </Link>
  );
}
