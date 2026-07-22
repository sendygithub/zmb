import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import KelasList from "./KelasList";

const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export default async function UserKelasPage() {
  const session = await auth();
  const user = session?.user as any;

  const schedules = await prisma.classSchedule.findMany({
    where: { isActive: true },
    include: {
      studio: true,
      attendances: {
        where: { userId: user.id },
      },
      _count: {
        select: { attendances: true },
      },
    },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  // Get today's date for default attendance date
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>User</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Kelas Zumba</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Kelas Zumba
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            {schedules.length} kelas tersedia minggu ini
          </p>
        </div>

        <KelasList
          schedules={schedules}
          userId={user.id}
          todayStr={todayStr}
          DAY_NAMES={DAY_NAMES}
        />
      </main>
    </>
  );
}
