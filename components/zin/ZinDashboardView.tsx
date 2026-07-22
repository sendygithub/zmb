"use client";

import {
  Users,
  CalendarDays,
  Clock,
  CheckCircle,
  PlayCircle,
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

type Schedule = {
  id: string;
  title: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  studio: { name: string };
  attendances: { id: string }[];
};

export default function ZinDashboardView({
  user,
  totalMembers,
  ongoingSchedules,
  upcomingSchedules,
  completedSchedules,
}: {
  user: { name?: string };
  totalMembers: number;
  ongoingSchedules: Schedule[];
  upcomingSchedules: Schedule[];
  completedSchedules: Schedule[];
}) {
  return (
    <>
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
        <StatCard
          icon={<Users className="w-5 h-5 text-[#AFFF00]" />}
          value={totalMembers}
          label="Total Member"
        />
        <StatCard
          icon={<PlayCircle className="w-5 h-5 text-[#AFFF00]" />}
          value={ongoingSchedules.length}
          label="Sedang Berlangsung"
        />
        <StatCard
          icon={<Clock className="w-5 h-5 text-[#AFFF00]" />}
          value={upcomingSchedules.length}
          label="Akan Datang"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5 text-[#AFFF00]" />}
          value={completedSchedules.length}
          label="Selesai"
        />
      </div>

      {/* Sedang Berlangsung */}
      {ongoingSchedules.length > 0 && (
        <ScheduleSection
          title="Sedang Berlangsung"
          icon={<PlayCircle className="w-4 h-4 text-[#AFFF00]" />}
          schedules={ongoingSchedules}
          DAY_NAMES={DAY_NAMES}
        />
      )}

      {/* Akan Datang */}
      <ScheduleSection
        title="Akan Datang"
        icon={<Clock className="w-4 h-4 text-[#AFFF00]" />}
        schedules={upcomingSchedules}
        DAY_NAMES={DAY_NAMES}
      />

      {/* Jadwal Selesai */}
      <ScheduleSection
        title="Jadwal Selesai"
        icon={<CheckCircle className="w-4 h-4 text-white/40" />}
        schedules={completedSchedules.slice(0, 5)}
        DAY_NAMES={DAY_NAMES}
        dimmed
      />
    </>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <div className="w-10 h-10 bg-[#AFFF00]/10 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-white font-mono">{value}</h3>
      <p className="text-white/40 text-xs mt-1.5">{label}</p>
    </div>
  );
}

function ScheduleSection({
  title,
  icon,
  schedules,
  DAY_NAMES,
  dimmed,
}: {
  title: string;
  icon: React.ReactNode;
  schedules: Schedule[];
  DAY_NAMES: string[];
  dimmed?: boolean;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
      <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-2">
        {icon}
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {schedules.length === 0 ? (
          <div className="px-6 py-8 text-center text-white/40 text-sm">
            Tidak ada jadwal.
          </div>
        ) : (
          schedules.map((s) => (
            <div
              key={s.id}
              className={`px-6 py-4 ${dimmed ? "opacity-60" : ""}`}
            >
              <p className="text-white text-sm font-medium">{s.title}</p>
              <p className="text-white/40 text-xs font-mono mt-0.5">
                {DAY_NAMES[s.dayOfWeek]} · {s.startTime} - {s.endTime} ·{" "}
                {s.studio.name} · {s.attendances.length} peserta
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
