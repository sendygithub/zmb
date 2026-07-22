import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import AdminJadwalView from "@/components/admin/AdminJadwalView";

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
        <AdminJadwalView schedules={schedules} />
      </main>
    </>
  );
}
