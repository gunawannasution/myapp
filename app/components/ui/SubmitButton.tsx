"use client";

import clsx from "clsx";
import React from "react";
import { useFormStatus } from "react-dom";

export interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label ketika tidak pending */
  label: string;

  /** Label ketika pending */
  pendingLabel?: string;

  /** Tampilkan spinner */
  showSpinner?: boolean;
}

export default function SubmitButton({
  label,
  pendingLabel = "Memproses...",
  showSpinner = true,
  className,
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={clsx(
        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg",
        pending
          ? "bg-gray-400 cursor-not-allowed opacity-70 shadow-none"
          : "bg-blue-600 text-white shadow-blue-100 active:scale-95 hover:bg-blue-700",
        className,
      )}
      {...props}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          {showSpinner && (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {pendingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
