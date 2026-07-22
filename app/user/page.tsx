import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ChevronRight,
  Activity,
  CalendarDays,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function UserDashboard() {
  const session = await auth();
  const user = session?.user as any;

  const totalAttendances = await prisma.attendance.count({
    where: { userId: user.id },
  });

  const upcomingSchedules = await prisma.classSchedule.findMany({
    where: { isActive: true },
    include: { studio: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    take: 5,
  });

  const memberships = await prisma.membership.findMany({
    where: { userId: user.id, status: "active" },
    include: { studio: true },
  });

  const DAY_NAMES = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>User</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Dashboard</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Halo, {user.name || "Zumba Lover"}! 👋
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            Selamat datang di dashboard kamu
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-3xl font-black text-white font-mono">
              {totalAttendances}
            </h3>
            <p className="text-white/40 text-xs mt-1.5">Kelas Diikuti</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-3xl font-black text-white font-mono">
              {memberships.length}
            </h3>
            <p className="text-white/40 text-xs mt-1.5">Membership Aktif</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center mb-4">
              <CalendarDays className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-3xl font-black text-white font-mono">
              {upcomingSchedules.length}
            </h3>
            <p className="text-white/40 text-xs mt-1.5">Jadwal Tersedia</p>
          </div>
        </div>

        {/* Jadwal Tersedia */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
            <h2 className="text-base font-bold text-white">
              Jadwal Kelas Tersedia
            </h2>
            <Link
              href="/user/kelas"
              className="text-xs font-mono text-white/40 hover:text-[#AFFF00] transition-colors"
            >
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {upcomingSchedules.map((s) => (
              <div
                key={s.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white text-sm font-medium">{s.title}</p>
                  <p className="text-white/40 text-xs font-mono mt-0.5">
                    {DAY_NAMES[s.dayOfWeek]} · {s.startTime} - {s.endTime} ·{" "}
                    {s.studio.name}
                  </p>
                </div>
                <span className="text-[#AFFF00] text-xs font-bold">
                  Rp {s.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Info */}
        {memberships.length > 0 && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-4">
              Membership Aktif
            </h2>
            <div className="space-y-3">
              {memberships.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between bg-white/[0.03] rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="text-white text-sm font-medium">
                      {m.studio.name}
                    </p>
                    <p className="text-white/40 text-xs font-mono mt-0.5">
                      Berlaku hingga{" "}
                      {new Date(m.endDate).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <span className="bg-[#AFFF00]/20 text-[#AFFF00] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
