import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ChevronRight,
  Users,
  CalendarDays,
  Clock,
  CheckCircle,
  PlayCircle,
  ListChecks,
} from "lucide-react";

const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export default async function ZinDashboard() {
  const session = await auth();
  const user = session?.user as any;

  // Get instructor's schedules
  const mySchedules = await prisma.classSchedule.findMany({
    where: { instructorId: user.id },
    include: { studio: true, attendances: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  // Get members who follow this instructor's classes
  const memberIds = await prisma.attendance.findMany({
    where: { scheduleId: { in: mySchedules.map((s) => s.id) } },
    select: { userId: true },
    distinct: ["userId"],
  });

  const totalMembers = memberIds.length;

  // Categorize schedules
  const today = new Date();
  const todayDayOfWeek = today.getDay();

  const ongoingSchedules = mySchedules.filter(
    (s) => s.dayOfWeek === todayDayOfWeek && s.isActive,
  );
  const upcomingSchedules = mySchedules.filter(
    (s) => s.dayOfWeek > todayDayOfWeek && s.isActive,
  );
  const completedSchedules = mySchedules.filter(
    (s) => s.dayOfWeek < todayDayOfWeek || !s.isActive,
  );

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Instruktur</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Dashboard</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Halo, {user.name || "Instruktur"}! 🎵
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            Kelola kelas zumba kamu
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-3xl font-black text-white font-mono">
              {totalMembers}
            </h3>
            <p className="text-white/40 text-xs mt-1.5">Total Member</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center mb-4">
              <PlayCircle className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-3xl font-black text-white font-mono">
              {ongoingSchedules.length}
            </h3>
            <p className="text-white/40 text-xs mt-1.5">Sedang Berlangsung</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-3xl font-black text-white font-mono">
              {upcomingSchedules.length}
            </h3>
            <p className="text-white/40 text-xs mt-1.5">Akan Datang</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-3xl font-black text-white font-mono">
              {completedSchedules.length}
            </h3>
            <p className="text-white/40 text-xs mt-1.5">Selesai</p>
          </div>
        </div>

        {/* Sedang Berlangsung */}
        {ongoingSchedules.length > 0 && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-[#AFFF00]" />
              <h2 className="text-base font-bold text-white">
                Sedang Berlangsung
              </h2>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {ongoingSchedules.map((s) => (
                <div key={s.id} className="px-6 py-4">
                  <p className="text-white text-sm font-medium">{s.title}</p>
                  <p className="text-white/40 text-xs font-mono mt-0.5">
                    {s.startTime} - {s.endTime} · {s.studio.name} ·{" "}
                    {s.attendances.length} peserta
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Akan Datang */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#AFFF00]" />
            <h2 className="text-base font-bold text-white">Akan Datang</h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {upcomingSchedules.length === 0 ? (
              <div className="px-6 py-8 text-center text-white/40 text-sm">
                Tidak ada jadwal mendatang.
              </div>
            ) : (
              upcomingSchedules.map((s) => (
                <div key={s.id} className="px-6 py-4">
                  <p className="text-white text-sm font-medium">{s.title}</p>
                  <p className="text-white/40 text-xs font-mono mt-0.5">
                    {DAY_NAMES[s.dayOfWeek]} · {s.startTime} - {s.endTime} ·{" "}
                    {s.studio.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Jadwal Selesai */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white/40" />
            <h2 className="text-base font-bold text-white">Jadwal Selesai</h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {completedSchedules.length === 0 ? (
              <div className="px-6 py-8 text-center text-white/40 text-sm">
                Belum ada jadwal selesai.
              </div>
            ) : (
              completedSchedules.slice(0, 5).map((s) => (
                <div key={s.id} className="px-6 py-4 opacity-60">
                  <p className="text-white text-sm font-medium">{s.title}</p>
                  <p className="text-white/40 text-xs font-mono mt-0.5">
                    {DAY_NAMES[s.dayOfWeek]} · {s.startTime} - {s.endTime}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
