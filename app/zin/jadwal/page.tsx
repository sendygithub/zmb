import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight, CheckCircle, PlayCircle, Clock } from "lucide-react";

const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export default async function ZinJadwalPage() {
  const session = await auth();
  const user = session?.user as any;

  const schedules = await prisma.classSchedule.findMany({
    where: { instructorId: user.id },
    include: { studio: true, attendances: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

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
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Instruktur</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Jadwal Kelas</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Jadwal Kelas
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            {schedules.length} jadwal kelas
          </p>
        </div>

        {/* Sedang Berlangsung */}
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

        {/* Akan Datang */}
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

        {/* Selesai */}
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
      </main>
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

function ScheduleCard({ s, DAY_NAMES }: { s: any; DAY_NAMES: string[] }) {
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
