"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  User,
} from "lucide-react";

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

const ITEMS_PER_PAGE = 6;

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
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(schedules.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedSchedules = schedules.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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

      {schedules.length === 0 ? (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-14 text-center">
          <p className="text-white/40 text-sm">Belum ada kelas tersedia.</p>
        </div>
      ) : (
        <>
          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedSchedules.map((s) => {
              const isAttending = s.attendances.some(
                (a) => a.status === "hadir",
              );
              const pesertaHadir = s._count.attendances;
              const sisaKuota = s.maxParticipants - pesertaHadir;
              const progressPercent = Math.min(
                (pesertaHadir / s.maxParticipants) * 100,
                100,
              );

              return (
                <div
                  key={s.id}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all hover:translate-y-[-2px]"
                >
                  {/* Card Header - Day & Time */}
                  <div className="bg-gradient-to-r from-[#AFFF00]/10 to-transparent px-5 py-4 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#AFFF00]">
                        {DAY_NAMES[s.dayOfWeek]}
                      </span>
                      <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {s.startTime} - {s.endTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {s.title}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="px-5 py-4 space-y-3">
                    {s.description && (
                      <p className="text-xs text-white/40 leading-relaxed">
                        {s.description}
                      </p>
                    )}

                    <div className="space-y-2 text-xs font-mono text-white/50">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-white/30" />
                        <span>{s.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-white/30" />
                        <span>{s.studio.name}</span>
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-white/50 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Peserta
                        </span>
                        <span className="text-white/40">
                          <span className="text-[#AFFF00] font-bold">
                            {pesertaHadir}
                          </span>
                          /{s.maxParticipants}
                        </span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            sisaKuota <= 0
                              ? "bg-red-500"
                              : progressPercent > 80
                                ? "bg-yellow-500"
                                : "bg-[#AFFF00]"
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-mono mt-1">
                        {sisaKuota > 0 ? (
                          <span className="text-white/30">
                            Sisa {sisaKuota} kursi tersedia
                          </span>
                        ) : (
                          <span className="text-red-400 font-bold">
                            KELAS PENUH
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-4 border-t border-white/[0.06] flex items-center justify-between">
                    <p className="text-[#AFFF00] font-black text-lg">
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
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-mono text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Sebelumnya
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-colors ${
                        pageNum === page
                          ? "bg-[#AFFF00] text-[#0D0F0A]"
                          : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-mono text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Selanjutnya
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
