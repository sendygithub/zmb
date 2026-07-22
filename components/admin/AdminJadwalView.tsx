"use client";

import ScheduleManager from "@/components/admin/ScheduleManager";

type Schedule = {
  id: string;
  title: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  instructor: string;
  maxParticipants: number;
  price: number;
  isActive: boolean;
  studioId: string;
  instructorId: string | null;
  description: string | null;
  location: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function AdminJadwalView({
  schedules,
}: {
  schedules: Schedule[];
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Jadwal Kelas
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            {schedules.length} jadwal tersedia
          </p>
        </div>
      </div>

      <ScheduleManager schedules={schedules} />
    </>
  );
}
