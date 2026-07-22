"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useUserActions() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleRole(
    userId: string,
    userName: string,
    userRole: string,
  ) {
    if (
      !confirm(
        `Ubah role ${userName} menjadi ${userRole === "admin" ? "user" : "admin"}?`,
      )
    )
      return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/toggle-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) router.refresh();
      else alert("Gagal mengubah role");
    } catch {
      alert("Terjadi kesalahan");
    }
    setLoading(false);
  }

  async function deleteUser(userId: string, userName: string) {
    if (
      !confirm(
        `Hapus pengguna ${userName}? Tindakan ini tidak bisa dibatalkan.`,
      )
    )
      return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) router.refresh();
      else alert("Gagal menghapus pengguna");
    } catch {
      alert("Terjadi kesalahan");
    }
    setLoading(false);
  }

  return { loading, toggleRole, deleteUser };
}
