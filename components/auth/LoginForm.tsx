import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginForm() {
  const { showPassword, togglePassword, isLoading, error, handleSubmit } =
    useLogin();

  return (
    <form action={handleSubmit} className="space-y-5">
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
              Memproses...
            </>
          ) : (
            "Masuk"
          )}
        </span>
      </motion.button>
    </form>
  );
}
