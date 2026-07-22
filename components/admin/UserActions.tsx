"use client";

import { Trash2, ArrowUpDown } from "lucide-react";
import { useUserActions } from "@/hooks/admin/useUserActions";

export default function UserActions({
  userId,
  userRole,
  userName,
}: {
  userId: string;
  userRole: string;
  userName: string;
}) {
  const { loading, toggleRole, deleteUser } = useUserActions();

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={() => toggleRole(userId, userName, userRole)}
        disabled={loading}
        className="p-2 rounded-lg text-white/40 hover:text-[#AFFF00] hover:bg-white/[0.06] transition-colors disabled:opacity-30"
        title="Ubah role"
      >
        <ArrowUpDown className="w-4 h-4" />
      </button>
      <button
        onClick={() => deleteUser(userId, userName)}
        disabled={loading}
        className="p-2 rounded-lg text-white/40 hover:text-[#FF4D6D] hover:bg-white/[0.06] transition-colors disabled:opacity-30"
        title="Hapus pengguna"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
