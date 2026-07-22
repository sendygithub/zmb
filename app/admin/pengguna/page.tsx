import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import AdminPenggunaView from "@/components/admin/AdminPenggunaView";

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
        <AdminPenggunaView users={users} />
      </main>
    </>
  );
}
