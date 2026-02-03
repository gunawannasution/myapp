import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  const inputId = props.id || props.name;

  return (
    <div className="group w-full space-y-2">
      {/* Label dengan efek transisi warna saat group fokus */}
      <label
        htmlFor={inputId}
        className="block text-[13px] font-semibold tracking-wide text-gray-500 transition-colors duration-200 group-focus-within:text-blue-600 ml-1 uppercase"
      >
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          id={inputId}
          className={`
            w-full px-4 py-2.5 text-sm bg-white border rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)]
            transition-all duration-300 ease-in-out
            placeholder:text-gray-300
            focus:outline-none focus:ring-4
            ${
              error
                ? "border-red-400 focus:ring-red-50 focus:border-red-500"
                : "border-gray-200 focus:ring-blue-50/60 focus:border-blue-500 hover:border-gray-300"
            }
            disabled:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed
          `}
        />

        {/* Border Glow Effect - Hanya muncul saat fokus */}
        {!error && (
          <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-blue-100 to-indigo-100 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-40" />
        )}
      </div>

      {/* Error Message dengan Style yang lebih tajam */}
      {error && (
        <div className="flex items-center gap-2 px-1 py-1 bg-red-50 rounded-lg animate-in fade-in zoom-in-95 duration-200">
          <svg
            className="w-3.5 h-3.5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[12px] text-red-600 font-semibold">
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
