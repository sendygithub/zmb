"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import { useLogin } from "@/hooks/auth/useLogin";
import LoginForm from "@/components/auth/LoginForm";
import BrandPanel from "@/components/auth/BrandPanel";

export default function LoginPage() {
  const { error } = useLogin();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FBFAF6]">
      {/* LEFT — panggung / brand panel */}
      <BrandPanel />

      {/* RIGHT — form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#14120E] tracking-tight">
              Masuk ke akunmu
            </h2>
            <p className="text-[#6B6B62] font-mono text-sm mt-1.5">
              Sesi berikutnya udah nunggu di jadwal kamu
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FF4D6D]/[0.08] border border-[#FF4D6D]/20 rounded-xl px-4 py-3 mb-6"
            >
              <p className="text-[#E0304F] text-sm font-mono">{error}</p>
            </motion.div>
          )}

          <LoginForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#14120E]/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FBFAF6] px-4 text-[#14120E]/40 font-mono">
                atau
              </span>
            </div>
          </div>

          <p className="text-center text-[#14120E]/60 font-mono text-sm">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-[#14120E] font-bold border-b-2 border-[#AFFF00] hover:border-[#14120E] transition-colors"
            >
              Daftar Sekarang
            </Link>
          </p>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-[#14120E]/40 hover:text-[#14120E]/70 font-mono text-xs transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
