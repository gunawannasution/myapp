// app/login/page.tsx
"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/authActions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form action={formAction} className="p-8 border rounded shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4">Login Admin</h1>

        {state?.success === false && (
          <p className="text-red-500 text-sm mb-2">{state.message}</p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isPending ? "Loading..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
