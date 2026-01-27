// app/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="w-full space-y-1">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <input
        {...props}
        className={`
          w-full px-4 py-2 border rounded-lg outline-none transition-all
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
