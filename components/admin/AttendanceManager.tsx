"use client";

import { Check, X, Trash2 } from "lucide-react";
import { useAttendanceManager } from "@/hooks/admin/useAttendanceManager";
import { DAY_NAMES } from "@/types/admin";
import type { Schedule, AdminUser, Attendance } from "@/types/admin";

export default function AttendanceManager({
  schedules,
  users,
  attendances,
}: {
  schedules: Schedule[];
  users: AdminUser[];
  attendances: Attendance[];
}) {
  const {
    selectedSchedule,
    setSelectedSchedule,
    selectedDate,
    setSelectedDate,
    loading,
    recordAttendance,
    deleteAttendance,
  } = useAttendanceManager();

  const selectedScheduleData = schedules.find((s) => s.id === selectedSchedule);

  // Filter attendances for selected schedule & date
  const filteredAttendances = attendances.filter((a) => {
    const attDate = new Date(a.date).toISOString().split("T")[0];
    return a.scheduleId === selectedSchedule && attDate === selectedDate;
  });

  return (
    <div>
      {/* Controls */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Kelas
            </label>
            <select
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
            >
              <option value="" className="bg-[#0D0F0A]">
                Pilih kelas...
              </option>
              {schedules.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0D0F0A]">
                  {s.title} ({DAY_NAMES[s.dayOfWeek]} {s.startTime})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
            />
          </div>
          <div className="flex items-end">
            {selectedScheduleData && (
              <p className="text-white/40 text-xs font-mono">
                {selectedScheduleData.title} ·{" "}
                {DAY_NAMES[selectedScheduleData.dayOfWeek]} ·{" "}
                {selectedScheduleData.startTime} -{" "}
                {selectedScheduleData.endTime}
              </p>
            )}
          </div>
        </div>
      </div>

      {!selectedSchedule ? (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-14 text-center">
          <p className="text-white/40 text-sm">
            Pilih kelas dan tanggal untuk mulai absensi.
          </p>
        </div>
      ) : (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Peserta
                  </th>
                  <th className="text-center text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Hadir
                  </th>
                  <th className="text-center text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Izin
                  </th>
                  <th className="text-center text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Alpha
                  </th>
                  <th className="text-right text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-14 text-center text-white/40 text-sm"
                    >
                      Belum ada pengguna biasa.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const att = filteredAttendances.find(
                      (a) => a.userId === u.id,
                    );
                    return (
                      <tr
                        key={u.id}
                        className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/70 text-xs font-bold shrink-0">
                              {(u.name || u.email).charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {u.name || "-"}
                              </p>
                              <p className="text-white/40 text-xs font-mono truncate">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              recordAttendance(
                                u.id,
                                selectedSchedule,
                                selectedDate,
                                "hadir",
                              )
                            }
                            disabled={loading[`${u.id}-hadir`]}
                            className={`p-2 rounded-lg transition-colors ${att?.status === "hadir" ? "bg-[#AFFF00]/20 text-[#AFFF00]" : "text-white/30 hover:text-[#AFFF00] hover:bg-white/[0.06]"}`}
                            title="Hadir"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              recordAttendance(
                                u.id,
                                selectedSchedule,
                                selectedDate,
                                "izin",
                              )
                            }
                            disabled={loading[`${u.id}-izin`]}
                            className={`p-2 rounded-lg transition-colors ${att?.status === "izin" ? "bg-yellow-500/20 text-yellow-400" : "text-white/30 hover:text-yellow-400 hover:bg-white/[0.06]"}`}
                            title="Izin"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              recordAttendance(
                                u.id,
                                selectedSchedule,
                                selectedDate,
                                "alpha",
                              )
                            }
                            disabled={loading[`${u.id}-alpha`]}
                            className={`p-2 rounded-lg transition-colors ${att?.status === "alpha" ? "bg-[#FF4D6D]/20 text-[#FF4D6D]" : "text-white/30 hover:text-[#FF4D6D] hover:bg-white/[0.06]"}`}
                            title="Alpha"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {att ? (
                            <div className="flex items-center justify-end gap-2">
                              <span
                                className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                                  att.status === "hadir"
                                    ? "bg-[#AFFF00]/20 text-[#AFFF00]"
                                    : att.status === "izin"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-[#FF4D6D]/20 text-[#FF4D6D]"
                                }`}
                              >
                                {att.status}
                              </span>
                              <button
                                onClick={() => deleteAttendance(att.id)}
                                className="p-1.5 rounded-lg text-white/30 hover:text-[#FF4D6D] hover:bg-white/[0.06] transition-colors"
                                title="Hapus"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-white/20 text-xs font-mono">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary */}
      {filteredAttendances.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-white/60 mb-3">
            Ringkasan — {filteredAttendances.length} peserta
          </h3>
          <div className="flex gap-3 text-xs font-mono">
            <span className="text-[#AFFF00]">
              Hadir:{" "}
              {filteredAttendances.filter((a) => a.status === "hadir").length}
            </span>
            <span className="text-yellow-400">
              Izin:{" "}
              {filteredAttendances.filter((a) => a.status === "izin").length}
            </span>
            <span className="text-[#FF4D6D]">
              Alpha:{" "}
              {filteredAttendances.filter((a) => a.status === "alpha").length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
