"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { useRegister } from "@/hooks/auth/useRegister";
import RegisterForm from "@/components/auth/RegisterForm";
import BrandPanel from "@/components/auth/BrandPanel";

export default function RegisterPage() {
  const { success } = useRegister();

  if (success) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#FBFAF6]">
        {/* LEFT — brand panel */}
        <BrandPanel />

        {/* RIGHT — success panel */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-[#AFFF00] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-[#14120E]" />
            </motion.div>
            <h2 className="text-2xl font-black text-[#14120E] tracking-tight mb-2">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-[#6B6B62] font-mono text-sm">
              Mengarahkan ke halaman login...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FBFAF6]">
      {/* LEFT — brand panel */}
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
              Buat akun baru
            </h2>
            <p className="text-[#6B6B62] font-mono text-sm mt-1.5">
              Gabung bersama Terong Zumba!
            </p>
          </div>

          <RegisterForm />

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
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-[#14120E] font-bold border-b-2 border-[#AFFF00] hover:border-[#14120E] transition-colors"
            >
              Masuk
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
