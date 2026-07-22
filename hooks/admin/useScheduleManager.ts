"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Schedule, ScheduleFormData } from "@/types/admin";
import { EMPTY_SCHEDULE_FORM } from "@/types/admin";

export function useScheduleManager() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ScheduleFormData>(EMPTY_SCHEDULE_FORM);
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setForm(EMPTY_SCHEDULE_FORM);
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(s: Schedule) {
    setForm({
      title: s.title,
      description: s.description || "",
      instructor: s.instructor,
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      endTime: s.endTime,
      maxParticipants: s.maxParticipants,
      location: s.location,
      isActive: s.isActive,
    });
    setEditingId(s.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const res = await fetch("/api/admin/schedules", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        if (res.ok) router.refresh();
        else alert("Gagal mengupdate jadwal");
      } else {
        const res = await fetch("/api/admin/schedules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) router.refresh();
        else alert("Gagal menambah jadwal");
      }
      resetForm();
    } catch {
      alert("Terjadi kesalahan");
    }
    setLoading(false);
  }

  async function deleteSchedule(id: string, title: string) {
    if (!confirm(`Hapus jadwal "${title}"?`)) return;
    try {
      const res = await fetch("/api/admin/schedules", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) router.refresh();
      else alert("Gagal menghapus jadwal");
    } catch {
      alert("Terjadi kesalahan");
    }
  }

  return {
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
  };
}
