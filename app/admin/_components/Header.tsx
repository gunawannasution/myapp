// app/admin/_components/Header.tsx
import { Menu } from "lucide-react";
import Image from "next/image";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu size={24} />
        </button>

        <h2 className="font-semibold text-gray-500 hidden sm:block text-sm">
          Administrator Panel
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800 leading-none">Admin</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
            Super Admin
          </p>
        </div>

        <div className="relative w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden">
          <Image
            src="https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=ffffff"
            alt="Admin Avatar"
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
