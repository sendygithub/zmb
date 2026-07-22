"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/lib/auth-actions";
import {
  Eye,
  EyeOff,
  Loader2,
  Check,
  X,
  Music2,
  Flame,
  Users2,
} from "lucide-react";

const BAR_COUNT = 24;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [password, setPassword] = useState("");

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await registerAction(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#FBFAF6]">
        {/* LEFT — brand panel */}
        <div className="relative lg:w-[46%] bg-[#14120E] text-white overflow-hidden flex flex-col">
          <div className="absolute -top-32 -left-24 w-72 h-72 bg-[#AFFF00]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-20 w-72 h-72 bg-[#FF4D6D]/10 rounded-full blur-3xl" />
          <div className="relative z-10 px-8 lg:px-12 pt-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-black tracking-tight">
                <span className="text-white">Terong</span>
                <span className="text-[#AFFF00]">Zumba</span>
              </span>
            </Link>
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-center px-8 lg:px-12 py-12">
            <div
              className="flex items-end gap-[3px] h-16 mb-8"
              aria-hidden="true"
            >
              {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-[5px] rounded-full"
                  style={{ background: i % 5 === 0 ? "#FF4D6D" : "#AFFF00" }}
                  animate={{ height: ["18%", "90%", "35%", "70%", "18%"] }}
                  transition={{
                    duration: 1.4 + (i % 5) * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 8) * 0.08,
                  }}
                />
              ))}
            </div>
            <h1 className="text-3xl lg:text-[2.5rem] font-black tracking-tight leading-[1.05] mb-4">
              Gabung,
              <br />
              gerak bareng kami.
            </h1>
            <p className="text-white/50 font-mono text-sm leading-relaxed max-w-sm mb-10">
              Daftar sekarang dan mulai perjalanan Zumba kamu. Akses jadwal
              kelas, pantau progres, dan terhubung dengan komunitas.
            </p>
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Music2 className="w-4 h-4 text-[#AFFF00]" />
                </div>
                <p className="text-sm text-white/70">
                  <span className="font-bold text-white">40+ kelas</span> per
                  minggu, playlist ganti tiap sesi
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 text-[#FF4D6D]" />
                </div>
                <p className="text-sm text-white/70">
                  Instruktor bersertifikasi, intensitas dari santai sampai sweat
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Users2 className="w-4 h-4 text-[#AFFF00]" />
                </div>
                <p className="text-sm text-white/70">
                  Komunitas aktif, absen bareng temen satu studio
                </p>
              </div>
            </div>
          </div>
        </div>

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
      <div className="relative lg:w-[46%] bg-[#14120E] text-white overflow-hidden flex flex-col">
        <div className="absolute -top-32 -left-24 w-72 h-72 bg-[#AFFF00]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-[#FF4D6D]/10 rounded-full blur-3xl" />

        <div className="relative z-10 px-8 lg:px-12 pt-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-black tracking-tight">
              <span className="text-white">Terong</span>
              <span className="text-[#AFFF00]">Zumba</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 lg:px-12 py-12">
          {/* Equalizer */}
          <div
            className="flex items-end gap-[3px] h-16 mb-8"
            aria-hidden="true"
          >
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[5px] rounded-full"
                style={{ background: i % 5 === 0 ? "#FF4D6D" : "#AFFF00" }}
                animate={{ height: ["18%", "90%", "35%", "70%", "18%"] }}
                transition={{
                  duration: 1.4 + (i % 5) * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 8) * 0.08,
                }}
              />
            ))}
          </div>

          <h1 className="text-3xl lg:text-[2.5rem] font-black tracking-tight leading-[1.05] mb-4">
            Gabung,
            <br />
            gerak bareng kami.
          </h1>
          <p className="text-white/50 font-mono text-sm leading-relaxed max-w-sm mb-10">
            Daftar sekarang dan mulai perjalanan Zumba kamu. Akses jadwal kelas,
            pantau progres, dan terhubung dengan komunitas.
          </p>

          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                <Music2 className="w-4 h-4 text-[#AFFF00]" />
              </div>
              <p className="text-sm text-white/70">
                <span className="font-bold text-white">40+ kelas</span> per
                minggu, playlist ganti tiap sesi
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4 text-[#FF4D6D]" />
              </div>
              <p className="text-sm text-white/70">
                Instruktor bersertifikasi, intensitas dari santai sampai sweat
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                <Users2 className="w-4 h-4 text-[#AFFF00]" />
              </div>
              <p className="text-sm text-white/70">
                Komunitas aktif, absen bareng temen satu studio
              </p>
            </div>
          </div>
        </div>
      </div>

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

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FF4D6D]/[0.08] border border-[#FF4D6D]/20 rounded-xl px-4 py-3 mb-6"
            >
              <p className="text-[#E0304F] text-sm font-mono">{error}</p>
            </motion.div>
          )}

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-mono text-[#14120E]/70 mb-2"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Nama kamu"
                className="w-full bg-white border-2 border-[#14120E]/10 rounded-xl px-4 py-3 text-[#14120E] placeholder:text-[#14120E]/30 font-mono text-sm focus:outline-none focus:border-[#AFFF00] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-mono text-[#14120E]/70 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="nama@email.com"
                className="w-full bg-white border-2 border-[#14120E]/10 rounded-xl px-4 py-3 text-[#14120E] placeholder:text-[#14120E]/30 font-mono text-sm focus:outline-none focus:border-[#AFFF00] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-mono text-[#14120E]/70 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-[#14120E]/10 rounded-xl px-4 py-3 text-[#14120E] placeholder:text-[#14120E]/30 font-mono text-sm focus:outline-none focus:border-[#AFFF00] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#14120E]/30 hover:text-[#14120E]/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-3 space-y-1.5">
                {(
                  [
                    {
                      key: "length",
                      label: "Minimal 8 karakter",
                      check: passwordChecks.length,
                    },
                    {
                      key: "uppercase",
                      label: "Huruf besar",
                      check: passwordChecks.uppercase,
                    },
                    {
                      key: "lowercase",
                      label: "Huruf kecil",
                      check: passwordChecks.lowercase,
                    },
                    {
                      key: "number",
                      label: "Angka",
                      check: passwordChecks.number,
                    },
                  ] as const
                ).map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    {item.check ? (
                      <Check className="w-3 h-3 text-[#AFFF00]" />
                    ) : (
                      <X className="w-3 h-3 text-[#14120E]/20" />
                    )}
                    <span
                      className={`font-mono text-xs ${
                        item.check ? "text-[#14120E]" : "text-[#14120E]/40"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#14120E] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Mendaftarkan...
                  </>
                ) : (
                  "Daftar"
                )}
              </span>
            </motion.button>
          </form>

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
