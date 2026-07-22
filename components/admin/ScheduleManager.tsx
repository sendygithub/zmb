"use client";

import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useScheduleManager } from "@/hooks/admin/useScheduleManager";
import { DAY_NAMES } from "@/types/admin";
import type { Schedule } from "@/types/admin";

export default function ScheduleManager({
  schedules,
}: {
  schedules: Schedule[];
}) {
  const {
    showForm,
    editingId,
    form,
    loading,
    setForm,
    setShowForm,
    resetForm,
    startEdit,
    handleSubmit,
    deleteSchedule,
  } = useScheduleManager();

  return (
    <div>
      {/* Form */}
      {showForm && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">
              {editingId ? "Edit Jadwal" : "Tambah Jadwal Baru"}
            </h3>
            <button
              onClick={resetForm}
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-white/50 mb-1">
                Nama Kelas
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#AFFF00] transition-colors"
                placeholder="Zumba Pagi"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-white/50 mb-1">
                Deskripsi
              </label>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#AFFF00] transition-colors"
                placeholder="Deskripsi kelas..."
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Instruktur
              </label>
              <input
                required
                value={form.instructor}
                onChange={(e) =>
                  setForm({ ...form, instructor: e.target.value })
                }
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#AFFF00] transition-colors"
                placeholder="Nama instruktur"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Hari
              </label>
              <select
                value={form.dayOfWeek}
                onChange={(e) =>
                  setForm({ ...form, dayOfWeek: parseInt(e.target.value) })
                }
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
              >
                {DAY_NAMES.map((name, i) => (
                  <option key={i} value={i} className="bg-[#0D0F0A]">
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-mono text-white/50 mb-1">
                  Mulai
                </label>
                <input
                  type="time"
                  required
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-mono text-white/50 mb-1">
                  Selesai
                </label>
                <input
                  type="time"
                  required
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Lokasi
              </label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#AFFF00] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Max Peserta
              </label>
              <input
                type="number"
                value={form.maxParticipants}
                onChange={(e) =>
                  setForm({
                    ...form,
                    maxParticipants: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-white/20 bg-white/[0.06]"
                />
                <span className="text-sm text-white/70">Aktif</span>
              </label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#AFFF00] text-[#0D0F0A] px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#AFFF00]/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : editingId ? "Simpan" : "Tambah"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#AFFF00] text-[#0D0F0A] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#AFFF00]/90 transition-colors mb-6"
        >
          <Plus className="w-4 h-4" />
          Tambah Jadwal
        </button>
      )}

      {/* Schedule List */}
      <div className="space-y-3">
        {schedules.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-14 text-center">
            <p className="text-white/40 text-sm">Belum ada jadwal kelas.</p>
          </div>
        ) : (
          schedules.map((s) => (
            <div
              key={s.id}
              className={`bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-colors ${!s.isActive ? "opacity-50" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-bold text-white">
                      {s.title}
                    </h3>
                    {!s.isActive && (
                      <span className="text-[10px] font-mono text-white/40 bg-white/[0.06] px-2 py-0.5 rounded-full">
                        Nonaktif
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-xs font-mono mb-2">
                    {DAY_NAMES[s.dayOfWeek]} · {s.startTime} - {s.endTime}
                  </p>
                  {s.description && (
                    <p className="text-white/40 text-xs mb-2">
                      {s.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-[11px] font-mono text-white/40">
                    <span>👤 {s.instructor}</span>
                    <span>📍 {s.location}</span>
                    <span>👥 {s.maxParticipants} peserta</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => startEdit(s)}
                    className="p-2 rounded-lg text-white/40 hover:text-[#AFFF00] hover:bg-white/[0.06] transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSchedule(s.id, s.title)}
                    className="p-2 rounded-lg text-white/40 hover:text-[#FF4D6D] hover:bg-white/[0.06] transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
