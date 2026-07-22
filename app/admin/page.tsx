import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  Activity,
  CalendarDays,
  ClipboardList,
  Building2,
  CreditCard,
  ChevronRight,
} from "lucide-react";

export default async function AdminDashboard() {
  const totalUsers = await prisma.user.count();
  const totalOwners = await prisma.user.count({ where: { role: "owner" } });
  const totalZin = await prisma.user.count({ where: { role: "zin" } });
  const totalRegularUsers = await prisma.user.count({
    where: { role: "user" },
  });
  const totalSchedules = await prisma.classSchedule.count({
    where: { isActive: true },
  });
  const totalAttendances = await prisma.attendance.count();
  const totalStudios = await prisma.studio.count();
  const totalTransactions = await prisma.transaction.count();
  const totalRevenue = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { status: "completed" },
  });

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentTransactions = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true },
  });

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Owner</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Dashboard</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Selamat datang kembali
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            Ringkasan bisnis Terong Zumba
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<Building2 className="w-5 h-5 text-[#AFFF00]" />}
            label="Total Sanggar"
            value={totalStudios}
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-[#AFFF00]" />}
            label="Total Pengguna"
            value={totalUsers}
          />
          <StatCard
            icon={<CalendarDays className="w-5 h-5 text-[#AFFF00]" />}
            label="Jadwal Aktif"
            value={totalSchedules}
          />
          <StatCard
            icon={<CreditCard className="w-5 h-5 text-[#AFFF00]" />}
            label="Total Pendapatan"
            value={`Rp ${(totalRevenue._sum.amount || 0).toLocaleString()}`}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-white/40 text-xs font-mono mb-1">Owner</p>
            <p className="text-2xl font-black text-white font-mono">
              {totalOwners}
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-white/40 text-xs font-mono mb-1">
              Instruktur (Zin)
            </p>
            <p className="text-2xl font-black text-white font-mono">
              {totalZin}
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-white/40 text-xs font-mono mb-1">User Biasa</p>
            <p className="text-2xl font-black text-white font-mono">
              {totalRegularUsers}
            </p>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
            <h2 className="text-base font-bold text-white">Pengguna Terbaru</h2>
            <Link
              href="/admin/pengguna"
              className="text-xs font-mono text-white/40 hover:text-[#AFFF00] transition-colors"
            >
              Lihat semua →
            </Link>
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
                            {(u.name || u.email || "?").charAt(0).toUpperCase()}
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
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${u.role === "owner" ? "bg-[#AFFF00] text-[#0D0F0A]" : u.role === "zin" ? "bg-blue-500/20 text-blue-400" : "bg-white/[0.08] text-white/60"}`}
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

        {/* Recent Transactions */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
            <h2 className="text-base font-bold text-white">
              Transaksi Terbaru
            </h2>
            <Link
              href="/admin/transaksi"
              className="text-xs font-mono text-white/40 hover:text-[#AFFF00] transition-colors"
            >
              Lihat semua →
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="text-white/40 text-sm">Belum ada transaksi.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                      User
                    </th>
                    <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                      Tipe
                    </th>
                    <th className="text-right text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                      Jumlah
                    </th>
                    <th className="text-right text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-white text-sm font-medium truncate">
                          {t.user.name || t.user.email}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/60 text-xs font-mono">
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-[#AFFF00] font-bold font-mono text-sm">
                        Rp {t.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${t.status === "completed" ? "bg-[#AFFF00]/20 text-[#AFFF00]" : "bg-white/[0.08] text-white/60"}`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors">
      <div className="flex items-center justify-between mb-5">
        <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-black text-white font-mono">{value}</h3>
      <p className="text-white/40 text-xs mt-1.5">{label}</p>
    </div>
  );
}
