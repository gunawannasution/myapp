// app/components/DataTable.tsx
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
    <table className="min-w-full border">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.header}</th>
          ))}
          {renderActions && <th>Aksi</th>}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1}>Tidak ada data</td>
          </tr>
        ) : (
          data.map((item, idx) => (
            <tr key={idx}>
              {columns.map((col, i) => (
                <td key={i}>
                  {typeof col.accessor === "function"
                    ? col.accessor(item)
                    : (item as any)[col.accessor]}
                </td>
              ))}
              {renderActions && <td>{renderActions(item)}</td>}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
