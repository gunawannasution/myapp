// app/_components/ProductCard.tsx
import { Leaf, ShoppingCart } from "lucide-react"; // Ganti icon jika perlu
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  const phoneNumber = "628123456789";

  // Pesan WA yang lebih relevan untuk pecinta tanaman
  const message = `Halo Kebun Hapesindo, saya tertarik dengan tanaman *${product.name}*. Bisa kirim foto realpict-nya?`;
  const waLink = `https://wa.me{phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f9faf8]">
        <Image
          src={product.images[0]?.url || "/placeholder-plant.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        {/* Label Status Tanaman */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm text-green-700">
          {product.stock > 0 ? "Ready Stock" : "Terjual"}
        </div>
      </div>

      <div className="p-6">
        {/* Label Kategori */}
        <div className="flex items-center gap-2 mb-2">
          <Leaf size={12} className="text-green-600" />
          <p className="text-[11px] font-bold text-green-600 uppercase tracking-[0.2em]">
            Premium Plant
          </p>
        </div>

        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              Investasi Hijau
            </span>
            <span className="text-xl font-black text-gray-900">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-900 text-white rounded-2xl hover:bg-green-600 transition-all active:scale-90 shadow-lg shadow-gray-200 flex items-center justify-center"
          >
            <ShoppingCart size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
