import Image from "next/image";
import Link from "next/link";

type ProductImage = {
  id: string;
  url: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  images: ProductImage[];
};

export default function ProductCard({ product }: { product: Product }) {
  const displayImage =
    product.images.length > 0 ? product.images[0].url : "/placeholder.jpg";

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-green-600 font-semibold mt-1">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </Link>
  );
}
