"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export default function NewClassForm({
  studios,
  instructorId,
  instructorName,
}: {
  studios: { id: string; name: string }[];
  instructorId: string;
  instructorName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    studioId: studios[0]?.id || "",
    dayOfWeek: 1,
    startTime: "07:00",
    endTime: "08:00",
    maxParticipants: 30,
    location: "",
    price: 35000,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          instructorId,
          instructor: instructorName,
        }),
      });

      if (res.ok) {
        router.push("/zin/jadwal");
        router.refresh();
      } else {
        alert("Gagal membuat kelas");
      }
    } catch {
      alert("Terjadi kesalahan");
    }
    setLoading(false);
  }

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
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

        <div>
          <label className="block text-xs font-mono text-white/50 mb-1">
            Deskripsi
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#AFFF00] transition-colors resize-none"
            rows={3}
            placeholder="Deskripsi kelas..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Sanggar
            </label>
            <select
              value={form.studioId}
              onChange={(e) => setForm({ ...form, studioId: e.target.value })}
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
            >
              {studios.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0D0F0A]">
                  {s.name}
                </option>
              ))}
            </select>
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

          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Mulai
            </label>
            <input
              type="time"
              required
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Selesai
            </label>
            <input
              type="time"
              required
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Lokasi
            </label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#AFFF00] transition-colors"
              placeholder="Studio Binong"
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

          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Harga (Rp)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: parseInt(e.target.value) || 0 })
              }
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#AFFF00] transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#AFFF00] text-[#0D0F0A] px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#AFFF00]/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Buat Kelas"}
        </button>
      </form>
    </div>
  );
}
