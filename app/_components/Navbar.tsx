import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-black text-gray-900">
            Hapesindo<span className="text-blue-600">.</span>
          </Link>

          {/* Search Bar Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari gadget impianmu..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full relative">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-[10px] text-white font-bold flex items-center justify-center rounded-full">
                2
              </span>
            </button>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all"
            >
              <User size={18} />
              <span className="hidden sm:inline">Masuk</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
