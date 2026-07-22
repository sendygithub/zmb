"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Schedule = {
  id: string;
  title: string;
  description: string | null;
  instructor: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  location: string;
  price: number;
  studio: { name: string };
  attendances: { id: string; status: string }[];
  _count: { attendances: number };
};

export default function KelasList({
  schedules,
  userId,
  todayStr,
  DAY_NAMES,
}: {
  schedules: Schedule[];
  userId: string;
  todayStr: string;
  DAY_NAMES: string[];
}) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggleAttendance(scheduleId: string) {
    setLoadingId(scheduleId);
    setError(null);

    try {
      const res = await fetch("/api/attendance/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scheduleId, date: todayStr }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal");
        return;
      }

      router.refresh();
    } catch {
      setError("Terjadi kesalahan");
    }
    setLoadingId(null);
  }

  return (
    <>
      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {schedules.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-14 text-center">
            <p className="text-white/40 text-sm">Belum ada kelas tersedia.</p>
          </div>
        ) : (
          schedules.map((s) => {
            const isAttending = s.attendances.some((a) => a.status === "hadir");
            const pesertaHadir = s._count.attendances;
            const sisaKuota = s.maxParticipants - pesertaHadir;

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
                    </div>

                    {/* Peserta & Kuota */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <span className="text-white/50">Peserta:</span>
                        <span className="text-[#AFFF00] font-bold">
                          {pesertaHadir}
                        </span>
                        <span className="text-white/30">
                          / {s.maxParticipants}
                        </span>
                      </div>
                      <div className="h-1.5 w-24 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#AFFF00] rounded-full transition-all"
                          style={{
                            width: `${Math.min((pesertaHadir / s.maxParticipants) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      {sisaKuota > 0 ? (
                        <span className="text-[10px] text-white/40 font-mono">
                          Sisa {sisaKuota} kursi
                        </span>
                      ) : (
                        <span className="text-[10px] text-red-400 font-mono font-bold">
                          PENUH
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-3">
                    <p className="text-[#AFFF00] font-bold text-lg">
                      Rp {s.price.toLocaleString()}
                    </p>

                    <button
                      onClick={() => toggleAttendance(s.id)}
                      disabled={
                        loadingId === s.id || (!isAttending && sisaKuota <= 0)
                      }
                      className={`text-[11px] font-bold px-4 py-2 rounded-lg transition-all ${
                        isAttending
                          ? "bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/20"
                          : sisaKuota <= 0
                            ? "bg-white/[0.05] text-white/20 cursor-not-allowed"
                            : "bg-[#AFFF00]/15 text-[#AFFF00] hover:bg-[#AFFF00]/25 border border-[#AFFF00]/20"
                      }`}
                    >
                      {loadingId === s.id
                        ? "..."
                        : isAttending
                          ? "Batal Hadir"
                          : "Hadir"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
