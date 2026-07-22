import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterForm() {
  const {
    showPassword,
    togglePassword,
    isLoading,
    error,
    password,
    setPassword,
    passwordChecks,
    handleSubmit,
  } = useRegister();

  const requirements = [
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
  ] as const;

  return (
    <form action={handleSubmit} className="space-y-5">
      {/* Nama */}
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

      {/* Email */}
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

      {/* Password */}
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
            onClick={togglePassword}
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
          {requirements.map((item) => (
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

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FF4D6D]/[0.08] border border-[#FF4D6D]/20 rounded-xl px-4 py-3"
        >
          <p className="text-[#E0304F] text-sm font-mono">{error}</p>
        </motion.div>
      )}

      {/* Submit Button */}
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
  );
}
