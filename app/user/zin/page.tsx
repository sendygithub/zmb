import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import UserZinListView from "@/components/user/UserZinListView";

export default async function UserZinPage() {
  const session = await auth();
  const user = session?.user as any;

  const zins = await prisma.user.findMany({
    where: { role: "zin" },
    include: { studio: true },
    orderBy: { name: "asc" },
  });

  const allSchedules = await prisma.classSchedule.findMany({
    where: { isActive: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  const schedulesByInstructor: Record<string, typeof allSchedules> = {};
  for (const s of allSchedules) {
    if (s.instructorId) {
      if (!schedulesByInstructor[s.instructorId]) {
        schedulesByInstructor[s.instructorId] = [];
      }
      schedulesByInstructor[s.instructorId].push(s);
    }
  }

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>User</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Zin</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <UserZinListView
          zins={zins}
          schedulesByInstructor={schedulesByInstructor}
        />
      </main>
    </>
  );
}
