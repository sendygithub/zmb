import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight, MapPin, CalendarDays, Star } from "lucide-react";

const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export default async function UserZinPage() {
  const session = await auth();
  const user = session?.user as any;

  // Get all Zin instructors
  const zins = await prisma.user.findMany({
    where: { role: "zin" },
    include: {
      studio: true,
    },
    orderBy: { name: "asc" },
  });

  // Get all active schedules grouped by instructor
  const allSchedules = await prisma.classSchedule.findMany({
    where: { isActive: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  // Group schedules by instructorId
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
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Instruktur Zumba (Zin)
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            {zins.length} instruktur tersedia minggu ini
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {zins.length === 0 ? (
            <div className="col-span-full bg-white/[0.03] border border-white/[0.06] rounded-2xl p-14 text-center">
              <p className="text-white/40 text-sm">
                Belum ada instruktur tersedia.
              </p>
            </div>
          ) : (
            zins.map((zin) => {
              const schedules = schedulesByInstructor[zin.id] || [];

              return (
                <div
                  key={zin.id}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors"
                >
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#AFFF00]/20 to-[#AFFF00]/5 flex items-center justify-center text-[#AFFF00] text-xl font-black shrink-0 border border-[#AFFF00]/20">
                      {(zin.name || "Z").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white">
                        {zin.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono mt-0.5">
                        <Star className="w-3 h-3 text-[#AFFF00]" />
                        <span>Instruktur Zumba</span>
                      </div>
                    </div>
                  </div>

                  {/* Studio */}
                  {zin.studio && (
                    <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-4 bg-white/[0.03] rounded-xl px-3 py-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{zin.studio.name}</span>
                    </div>
                  )}

                  {/* Phone */}
                  {zin.phone && (
                    <p className="text-xs font-mono text-white/30 mb-3">
                      📞 {zin.phone}
                    </p>
                  )}

                  {/* Schedule Grid */}
                  <div className="border-t border-white/[0.06] pt-3">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/40 mb-3">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>{schedules.length} jadwal minggu ini</span>
                    </div>

                    {schedules.length > 0 ? (
                      <div className="space-y-1.5">
                        {schedules.map((s) => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between text-[11px] font-mono bg-white/[0.03] rounded-lg px-3 py-2"
                          >
                            <span className="text-white/60">
                              {DAY_NAMES[s.dayOfWeek]}
                            </span>
                            <span className="text-white/40">
                              {s.startTime} - {s.endTime}
                            </span>
                            <span className="text-[#AFFF00] font-bold">
                              Rp {s.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-white/30 font-mono">
                        Belum ada jadwal
                      </p>
                    )}
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
