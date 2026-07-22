"use client";

import AttendanceManager from "@/components/admin/AttendanceManager";

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

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  phone: string | null;
  avatar: string | null;
  studioId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type Attendance = {
  id: string;
  userId: string;
  scheduleId: string;
  date: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  schedule: Schedule;
};

export default function AdminAbsensiView({
  schedules,
  users,
  attendances,
}: {
  schedules: Schedule[];
  users: User[];
  attendances: Attendance[];
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Absensi
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            Catat kehadiran peserta kelas
          </p>
        </div>
      </div>

      <AttendanceManager
        schedules={schedules}
        users={users}
        attendances={attendances}
      />
    </>
  );
}
