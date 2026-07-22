import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import UserDashboardView from "@/components/user/UserDashboardView";

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
        <UserDashboardView
          user={user}
          totalAttendances={totalAttendances}
          upcomingSchedules={upcomingSchedules}
          memberships={memberships}
        />
      </main>
    </>
  );
}
