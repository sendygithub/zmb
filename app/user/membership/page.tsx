import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";

export default async function UserMembershipPage() {
  const session = await auth();
  const user = session?.user as any;

  const memberships = await prisma.membership.findMany({
    where: { userId: user.id },
    include: { studio: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>User</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Membership</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Membership
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            {memberships.length} membership terdaftar
          </p>
        </div>

        <div className="space-y-4">
          {memberships.length === 0 ? (
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-14 text-center">
              <p className="text-white/40 text-sm">Belum ada membership.</p>
            </div>
          ) : (
            memberships.map((m) => (
              <div
                key={m.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {m.studio.name}
                    </h3>
                    <p className="text-white/50 text-xs font-mono mt-1">
                      {m.studio.address}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs font-mono text-white/40">
                      <span>
                        Mulai:{" "}
                        {new Date(m.startDate).toLocaleDateString("id-ID")}
                      </span>
                      <span>
                        Berakhir:{" "}
                        {new Date(m.endDate).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${
                      m.status === "active"
                        ? "bg-[#AFFF00]/20 text-[#AFFF00]"
                        : m.status === "expired"
                          ? "bg-[#FF4D6D]/20 text-[#FF4D6D]"
                          : "bg-white/[0.08] text-white/60"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
