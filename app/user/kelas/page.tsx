import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";

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
    include: { studio: true, attendances: { where: { userId: user.id } } },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

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
            {schedules.length} kelas tersedia
          </p>
        </div>

        <div className="space-y-3">
          {schedules.length === 0 ? (
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-14 text-center">
              <p className="text-white/40 text-sm">Belum ada kelas tersedia.</p>
            </div>
          ) : (
            schedules.map((s) => {
              const hasAttended = s.attendances.length > 0;
              return (
                <div
                  key={s.id}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-white">
                        {s.title}
                      </h3>
                      <p className="text-white/50 text-xs font-mono mt-1">
                        {DAY_NAMES[s.dayOfWeek]} · {s.startTime} - {s.endTime}
                      </p>
                      {s.description && (
                        <p className="text-white/40 text-xs mt-2">
                          {s.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-[11px] font-mono text-white/40 mt-2">
                        <span>👤 {s.instructor}</span>
                        <span>📍 {s.studio.name}</span>
                        <span>👥 {s.maxParticipants} peserta</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[#AFFF00] font-bold text-lg">
                        Rp {s.price.toLocaleString()}
                      </p>
                      {hasAttended && (
                        <span className="text-[10px] text-[#AFFF00] bg-[#AFFF00]/10 px-2 py-0.5 rounded-full">
                          Pernah diikuti
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
