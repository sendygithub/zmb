import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/lib/auth-actions";
import { User, Calendar, Clock, Activity } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  if (user.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight">
              <span className="text-white">Terong</span>
              <span className="text-[#AFFF00]">Zumba</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#AFFF00]/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#AFFF00]" />
              </div>
              <span className="text-white/80 font-mono text-sm">
                {user.name || user.email}
              </span>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors font-mono text-sm"
              >
                <span className="text-sm">Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Halo, {user.name || "Zumba Lover"}! 👋
          </h1>
          <p className="text-white/60 font-mono text-sm mt-2">
            Selamat datang di dashboard Terong Zumba kamu
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/20 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-2xl font-black text-white">0</h3>
            <p className="text-white/40 font-mono text-xs mt-1">
              Kelas Diikuti
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/20 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-2xl font-black text-white">0</h3>
            <p className="text-white/40 font-mono text-xs mt-1">
              Jadwal Mendatang
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/20 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-2xl font-black text-white">0</h3>
            <p className="text-white/40 font-mono text-xs mt-1">Jam Latihan</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-black text-white mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all group"
            >
              <h3 className="text-white font-bold group-hover:text-[#AFFF00] transition-colors">
                Lihat Jadwal Kelas
              </h3>
              <p className="text-white/40 font-mono text-xs mt-1">
                Cek jadwal Zumba terbaru
              </p>
            </Link>
            <Link
              href="/"
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all group"
            >
              <h3 className="text-white font-bold group-hover:text-[#AFFF00] transition-colors">
                Riwayat Kelas
              </h3>
              <p className="text-white/40 font-mono text-xs mt-1">
                Lihat kelas yang sudah kamu ikuti
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
