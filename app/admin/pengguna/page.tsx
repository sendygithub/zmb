import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import UserActions from "@/components/admin/UserActions";

export default async function PenggunaPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Admin</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Pengguna</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Kelola Pengguna
            </h1>
            <p className="text-white/40 font-mono text-sm mt-1.5">
              Total {users.length} pengguna terdaftar
            </p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Pengguna
                  </th>
                  <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Role
                  </th>
                  <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Bergabung
                  </th>
                  <th className="text-right text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/70 text-xs font-bold shrink-0">
                          {(u.name || u.email || "?").charAt(0).toUpperCase()}
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
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${u.role === "admin" ? "bg-[#AFFF00] text-[#0D0F0A]" : "bg-white/[0.08] text-white/60"}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 font-mono text-xs">
                      {new Date(u.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <UserActions
                        userId={u.id}
                        userRole={u.role}
                        userName={u.name || u.email || ""}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
