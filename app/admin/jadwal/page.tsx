import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import ScheduleManager from "@/components/admin/ScheduleManager";

export default async function JadwalPage() {
  const schedules = await prisma.classSchedule.findMany({
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Admin</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Jadwal Kelas</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Jadwal Kelas
            </h1>
            <p className="text-white/40 font-mono text-sm mt-1.5">
              {schedules.length} jadwal tersedia
            </p>
          </div>
        </div>

        <ScheduleManager schedules={schedules} />
      </main>
    </>
  );
}
