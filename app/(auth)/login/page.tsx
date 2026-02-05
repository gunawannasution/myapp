"use client";

import { Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { useActionState } from "react";
import { loginAction } from "../../actions/authActions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-100 via-white to-gray-100 flex items-center justify-center p-6">
      {/* Dekorasi Background - Hidden di HP agar tidak berat */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 hidden sm:block">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute top-[60%] left-[70%] w-[30%] h-[30%] rounded-full bg-indigo-100/50 blur-[120px]" />
      </div>

      {/* Container Utama: w-full (HP) & max-w-md (Desktop) */}
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        {/* Logo / Icon Area */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
            <ShieldCheck className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Gunawan<span className="text-blue-600">App</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2 font-medium px-4">
            Silakan masuk untuk mengelola sistem.
          </p>
        </div>

        {/* Card Form: Responsive Padding */}
        <div className="bg-white/80 backdrop-blur-xl border border-white p-6 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <form action={formAction} className="space-y-6">
            {/* Error Message */}
            {state?.success === false && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                {state.message}
              </div>
            )}

            <div className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[11px] sm:text-[12px] font-black text-gray-400 ml-1 uppercase tracking-[0.15em]">
                  Admin Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="admin@mail.com"
                    required
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all placeholder:text-gray-300 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[11px] sm:text-[12px] font-black text-gray-400 ml-1 uppercase tracking-[0.15em]">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all placeholder:text-gray-300 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-blue-100 active:scale-[0.97] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-sm sm:text-base"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-[11px] sm:text-xs mt-10 font-medium tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Control Panel &bull; v1.0
        </p>
      </div>
    </div>
  );
}
