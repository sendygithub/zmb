import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/lib/auth-actions";
import {
  Users,
  Shield,
  Activity,
  Settings,
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Search,
  Bell,
  ChevronRight,
} from "lucide-react";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  const totalUsers = await prisma.user.count();
  const totalAdmins = await prisma.user.count({
    where: { role: "admin" },
  });
  const totalRegularUsers = await prisma.user.count({
    where: { role: "user" },
  });

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Derived stat — persentase asli dari data, bukan angka fiktif
  const adminRatio =
    totalUsers > 0 ? Math.round((totalAdmins / totalUsers) * 100) : 0;
  const userRatio = 100 - adminRatio;

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Pengguna", icon: Users, active: false },
    { label: "Jadwal Kelas", icon: CalendarDays, active: false },
    { label: "Absensi", icon: ClipboardList, active: false },
    { label: "Pengaturan", icon: Settings, active: false },
  ];

  return (
    <div className="min-h-screen bg-[#0D0F0A] text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-white/[0.06] bg-[#0F110B] shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight">
              <span className="text-white">Terong</span>
              <span className="text-[#AFFF00]">Zumba</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#AFFF00]/10 text-[#AFFF00]"
                  : "text-white/50 hover:text-white/90 hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className="w-4 h-4" strokeWidth={2} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03]">
            <div className="w-8 h-8 rounded-full bg-[#AFFF00]/15 flex items-center justify-center text-[#AFFF00] text-xs font-bold shrink-0">
              {(user.name || user.email || "A").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {user.name || "Admin"}
              </p>
              <p className="text-[11px] text-white/40 truncate">{user.email}</p>
            </div>
          </div>
          <form action={logoutAction} className="mt-1">
            <button
              type="submit"
              className="w-full text-left px-3 py-2 text-[13px] text-white/35 hover:text-white/70 transition-colors font-mono"
            >
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 w-56">
              <Search className="w-3.5 h-3.5 text-white/30" />
              <input
                placeholder="Cari pengguna..."
                className="bg-transparent text-xs text-white placeholder:text-white/30 outline-none w-full"
              />
            </div>
            <button className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/80 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="px-6 md:px-8 py-8 max-w-6xl">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Selamat datang kembali
            </h1>
            <p className="text-white/40 font-mono text-sm mt-1.5">
              Ringkasan aktivitas pengguna Terong Zumba
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#AFFF00]" />
                </div>
                <span className="text-[11px] font-mono text-white/30 uppercase tracking-wider">
                  Total
                </span>
              </div>
              <h3 className="text-3xl font-black text-white font-mono">
                {totalUsers}
              </h3>
              <p className="text-white/40 text-xs mt-1.5">
                Total pengguna terdaftar
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#AFFF00]" />
                </div>
                <span className="text-[11px] font-mono text-white/30 uppercase tracking-wider">
                  {userRatio}%
                </span>
              </div>
              <h3 className="text-3xl font-black text-white font-mono">
                {totalRegularUsers}
              </h3>
              <p className="text-white/40 text-xs mt-1.5">Pengguna biasa</p>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#AFFF00]" />
                </div>
                <span className="text-[11px] font-mono text-white/30 uppercase tracking-wider">
                  {adminRatio}%
                </span>
              </div>
              <h3 className="text-3xl font-black text-white font-mono">
                {totalAdmins}
              </h3>
              <p className="text-white/40 text-xs mt-1.5">Administrator</p>
            </div>
          </div>

          {/* Komposisi bar — pengganti chart, dari data asli */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                Komposisi Peran
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden flex">
              <div
                className="h-full bg-[#AFFF00]"
                style={{ width: `${adminRatio}%` }}
              />
              <div
                className="h-full bg-white/20"
                style={{ width: `${userRatio}%` }}
              />
            </div>
            <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#AFFF00]" /> Admin (
                {adminRatio}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/20" /> User (
                {userRatio}%)
              </span>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <h2 className="text-base font-bold text-white">
                Pengguna Terbaru
              </h2>
              <button className="text-xs font-mono text-white/40 hover:text-[#AFFF00] transition-colors">
                Lihat semua →
              </button>
            </div>

            {recentUsers.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <p className="text-white/40 text-sm">
                  Belum ada pengguna terdaftar.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                        Pengguna
                      </th>
                      <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                        Role
                      </th>
                      <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                        Bergabung
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/70 text-xs font-bold shrink-0">
                              {(u.name || u.email || "?")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {u.name || "-"}
                              </p>
                              <p className="text-white/40 text-xs font-mono truncate">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                              u.role === "admin"
                                ? "bg-[#AFFF00] text-[#0D0F0A]"
                                : "bg-white/[0.08] text-white/60"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/40 font-mono text-xs">
                          {new Date(u.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
