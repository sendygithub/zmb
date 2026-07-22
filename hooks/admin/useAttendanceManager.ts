"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAttendanceManager() {
  const router = useRouter();
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  async function recordAttendance(
    userId: string,
    scheduleId: string,
    date: string,
    status: string,
  ) {
    if (!scheduleId || !date) return;

    const key = `${userId}-${status}`;
    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await fetch("/api/admin/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, scheduleId, date, status }),
      });
      if (res.ok) router.refresh();
      else alert("Gagal mencatat absensi");
    } catch {
      alert("Terjadi kesalahan");
    }
    setLoading((prev) => ({ ...prev, [key]: false }));
  }

  async function deleteAttendance(id: string) {
    try {
      const res = await fetch("/api/admin/attendance", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) router.refresh();
      else alert("Gagal menghapus absensi");
    } catch {
      alert("Terjadi kesalahan");
    }
  }

  return {
    selectedSchedule,
    setSelectedSchedule,
    selectedDate,
    setSelectedDate,
    loading,
    recordAttendance,
    deleteAttendance,
  };
}
