"use client";

import { CheckCircle, PlayCircle, Clock } from "lucide-react";

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
  price: number;
  studio: { name: string };
  attendances: { id: string }[];
};

export default function ZinJadwalView({
  schedules,
}: {
  schedules: Schedule[];
}) {
  const today = new Date();
  const todayDayOfWeek = today.getDay();

  const ongoing = schedules.filter(
    (s) => s.dayOfWeek === todayDayOfWeek && s.isActive,
  );
  const upcoming = schedules.filter(
    (s) => s.dayOfWeek > todayDayOfWeek && s.isActive,
  );
  const completed = schedules.filter(
    (s) => s.dayOfWeek < todayDayOfWeek || !s.isActive,
  );

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Jadwal Kelas
        </h1>
        <p className="text-white/40 font-mono text-sm mt-1.5">
          {schedules.length} jadwal kelas
        </p>
      </div>

      <Section
        title="Sedang Berlangsung"
        icon={<PlayCircle className="w-4 h-4 text-[#AFFF00]" />}
      >
        {ongoing.length === 0 ? (
          <EmptyState message="Tidak ada kelas yang sedang berlangsung." />
        ) : (
          ongoing.map((s) => (
            <ScheduleCard key={s.id} s={s} DAY_NAMES={DAY_NAMES} />
          ))
        )}
      </Section>

      <Section
        title="Akan Datang"
        icon={<Clock className="w-4 h-4 text-[#AFFF00]" />}
      >
        {upcoming.length === 0 ? (
          <EmptyState message="Tidak ada jadwal mendatang." />
        ) : (
          upcoming.map((s) => (
            <ScheduleCard key={s.id} s={s} DAY_NAMES={DAY_NAMES} />
          ))
        )}
      </Section>

      <Section
        title="Selesai"
        icon={<CheckCircle className="w-4 h-4 text-white/40" />}
      >
        {completed.length === 0 ? (
          <EmptyState message="Belum ada jadwal selesai." />
        ) : (
          completed.map((s) => (
            <ScheduleCard key={s.id} s={s} DAY_NAMES={DAY_NAMES} />
          ))
        )}
      </Section>
    </>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
      <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-2">
        {icon}
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      <div className="divide-y divide-white/[0.04]">{children}</div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-6 py-8 text-center text-white/40 text-sm">{message}</div>
  );
}

function ScheduleCard({ s, DAY_NAMES }: { s: Schedule; DAY_NAMES: string[] }) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">{s.title}</p>
          <p className="text-white/40 text-xs font-mono mt-0.5">
            {DAY_NAMES[s.dayOfWeek]} · {s.startTime} - {s.endTime} ·{" "}
            {s.studio.name}
          </p>
          <p className="text-white/30 text-[11px] font-mono mt-0.5">
            Rp {s.price.toLocaleString()} · {s.attendances.length} peserta
          </p>
        </div>
        <span className="text-[#AFFF00] text-xs font-bold">
          Rp {s.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
