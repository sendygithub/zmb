"use client";

import { MapPin, CalendarDays, Star } from "lucide-react";

const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

type Zin = {
  id: string;
  name: string | null;
  phone: string | null;
  studio: { name: string } | null;
};

type Schedule = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  price: number;
};

export default function UserZinListView({
  zins,
  schedulesByInstructor,
}: {
  zins: Zin[];
  schedulesByInstructor: Record<string, Schedule[]>;
}) {
  return (
    <>
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
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#AFFF00]/20 to-[#AFFF00]/5 flex items-center justify-center text-[#AFFF00] text-xl font-black shrink-0 border border-[#AFFF00]/20">
                    {(zin.name || "Z").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white">{zin.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono mt-0.5">
                      <Star className="w-3 h-3 text-[#AFFF00]" />
                      <span>Instruktur Zumba</span>
                    </div>
                  </div>
                </div>

                {zin.studio && (
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-4 bg-white/[0.03] rounded-xl px-3 py-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{zin.studio.name}</span>
                  </div>
                )}

                {zin.phone && (
                  <p className="text-xs font-mono text-white/30 mb-3">
                    📞 {zin.phone}
                  </p>
                )}

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
    </>
  );
}
