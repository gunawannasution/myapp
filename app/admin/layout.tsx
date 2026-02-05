// app/admin/layout.tsx
"use client";
import { useState } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      {/* Sidebar - Menerima state untuk kontrol buka/tutup */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Konten Utama - Menyesuaikan margin kiri hanya di Desktop (ml-64) */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 lg:p-8 flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
