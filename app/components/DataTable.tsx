import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data?: T[];
  columns: Column<T>[];
  renderActions?: (item: T) => React.ReactNode;
}

export default function DataTable<T>({
  data = [],
  columns,
  renderActions,
}: DataTableProps<T>) {
  return (
    <div className="w-full">
      {/* Container utama dengan shadow dan rounded yang manis */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Wrapper untuk Horizontal Scroll di HP agar tidak merusak layout body */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-600">
            {/* Header: Dibuat lebih tinggi sedikit untuk touch target */}
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="whitespace-nowrap px-4 py-4 md:px-6">
                    {col.header}
                  </th>
                ))}
                {renderActions && (
                  <th className="px-4 py-4 md:px-6 text-right">Aksi</th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (renderActions ? 1 : 0)}
                    className="px-6 py-12 text-center text-gray-400 italic"
                  >
                    Tidak ada data tersedia
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={idx}
                    className="group transition-colors hover:bg-blue-50/30"
                  >
                    {columns.map((col, i) => (
                      <td
                        key={i}
                        className="whitespace-nowrap px-4 py-4 md:px-6"
                      >
                        {/* Menambahkan label kecil jika di layar sangat kecil (optional hint) */}
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-medium md:font-normal">
                            {typeof col.accessor === "function"
                              ? col.accessor(item)
                              : (item as any)[col.accessor]}
                          </span>
                        </div>
                      </td>
                    ))}

                    {renderActions && (
                      <td className="px-4 py-4 md:px-6">
                        {/* Container Aksi: Dibuat agar icon/button tidak terlalu mepet di HP */}
                        <div className="flex justify-end items-center gap-4">
                          {renderActions(item)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hint untuk user HP */}
      <p className="mt-2 text-center text-xs text-gray-400 md:hidden italic">
        ← Geser untuk melihat detail lainnya →
      </p>
    </div>
  );
}
