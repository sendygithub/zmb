import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";

export default async function TransaksiPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Owner</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Transaksi</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Transaksi
            </h1>
            <p className="text-white/40 font-mono text-sm mt-1.5">
              {transactions.length} transaksi · Total Rp{" "}
              {totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    User
                  </th>
                  <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Tipe
                  </th>
                  <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Deskripsi
                  </th>
                  <th className="text-right text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Jumlah
                  </th>
                  <th className="text-right text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-right text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center text-white/40 text-sm"
                    >
                      Belum ada transaksi.
                    </td>
                  </tr>
                ) : (
                  transactions.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-white text-sm font-medium truncate">
                          {t.user.name || t.user.email}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/60 text-xs font-mono">
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white/40 text-xs font-mono truncate max-w-[200px]">
                          {t.description || "-"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right text-[#AFFF00] font-bold font-mono text-sm">
                        Rp {t.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${t.status === "completed" ? "bg-[#AFFF00]/20 text-[#AFFF00]" : "bg-yellow-500/20 text-yellow-400"}`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-white/40 font-mono text-xs">
                        {new Date(t.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
