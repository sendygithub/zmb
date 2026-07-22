"use client";

import { MapPin, Phone, Users, CalendarDays } from "lucide-react";

type Studio = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  description: string | null;
  owner: { name: string | null; email: string };
  instructors: { id: string }[];
  schedules: { id: string }[];
  _count: { memberships: number };
};

export default function AdminSanggarView({ studios }: { studios: Studio[] }) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Kelola Sanggar
        </h1>
        <p className="text-white/40 font-mono text-sm mt-1.5">
          {studios.length} sanggar terdaftar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studios.map((s) => (
          <div
            key={s.id}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors"
          >
            <h3 className="text-lg font-bold text-white mb-2">{s.name}</h3>
            {s.description && (
              <p className="text-white/40 text-xs mb-4">{s.description}</p>
            )}

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                <MapPin className="w-3.5 h-3.5" />
                {s.address}
              </div>
              {s.phone && (
                <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                  <Phone className="w-3.5 h-3.5" />
                  {s.phone}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-white/40 border-t border-white/[0.06] pt-4">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {s.instructors.length} instruktur
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                {s.schedules.length} jadwal aktif
              </span>
              <span>{s._count.memberships} member</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
