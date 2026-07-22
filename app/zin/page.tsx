import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import ZinDashboardView from "@/components/zin/ZinDashboardView";

export default async function ZinDashboard() {
  const session = await auth();
  const user = session?.user as any;

  const mySchedules = await prisma.classSchedule.findMany({
    where: { instructorId: user.id },
    include: { studio: true, attendances: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  const memberIds = await prisma.attendance.findMany({
    where: { scheduleId: { in: mySchedules.map((s) => s.id) } },
    select: { userId: true },
    distinct: ["userId"],
  });

  const totalMembers = memberIds.length;

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
        <ZinDashboardView
          user={user}
          totalMembers={totalMembers}
          ongoingSchedules={ongoingSchedules}
          upcomingSchedules={upcomingSchedules}
          completedSchedules={completedSchedules}
        />
      </main>
    </>
  );
}
