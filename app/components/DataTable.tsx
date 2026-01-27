// app/components/DataTable.tsx
import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (item: T) => React.ReactNode;
}

export default function DataTable<T extends { id: number | string }>({
  data,
  columns,
  actions,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 border-b">
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-6 py-4 text-center">Aksi</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-6 py-10 text-center text-gray-500"
              >
                Data tidak ditemukan.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4 text-sm text-gray-600">
                    {typeof col.accessor === "function"
                      ? col.accessor(item)
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      {actions(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
