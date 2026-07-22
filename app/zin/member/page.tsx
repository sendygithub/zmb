import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import ZinMemberListView from "@/components/zin/ZinMemberListView";

export default async function ZinMemberPage() {
  const session = await auth();
  const user = session?.user as any;

  const mySchedules = await prisma.classSchedule.findMany({
    where: { instructorId: user.id },
    select: { id: true },
  });

  const scheduleIds = mySchedules.map((s) => s.id);

  const attendances = await prisma.attendance.findMany({
    where: { scheduleId: { in: scheduleIds } },
    include: { user: true },
    distinct: ["userId"],
    orderBy: { user: { name: "asc" } },
  });

  const memberships = await prisma.membership.findMany({
    where: { userId: { in: attendances.map((a) => a.userId) } },
    include: { studio: true },
  });

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Instruktur</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Daftar Member</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <ZinMemberListView
          attendances={attendances}
          memberships={memberships}
        />
      </main>
    </>
  );
}
