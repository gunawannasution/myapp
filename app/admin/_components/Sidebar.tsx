// app/admin/_components/Sidebar.tsx
"use client";
import { logoutAction } from "@/app/actions/authActions";
import { LayoutDashboard, LogOut, Package, Tags, Users, X } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const menu = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Distributors", href: "/admin/distributors", icon: Tags },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <>
      {/* Overlay untuk Mobile (Klik di luar sidebar untuk menutup) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="font-bold text-xl">
              Gunawan<span className="text-blue-600">App</span>
            </span>
          </div>
          {/* Tombol Close khusus Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onClose()} // Tutup sidebar otomatis di mobile setelah klik menu
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-medium"
            >
              <item.icon size={20} /> {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <form action={logoutAction}>
            <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium">
              <LogOut size={20} /> Logout
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
