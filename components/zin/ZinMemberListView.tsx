"use client";

type Attendance = {
  userId: string;
  user: { name: string | null; email: string };
};

type Membership = {
  userId: string;
  status: string;
  studio: { name: string };
};

export default function ZinMemberListView({
  attendances,
  memberships,
}: {
  attendances: Attendance[];
  memberships: Membership[];
}) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Daftar Member
        </h1>
        <p className="text-white/40 font-mono text-sm mt-1.5">
          {attendances.length} member mengikuti kelas kamu
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                  Member
                </th>
                <th className="text-left text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                  Membership
                </th>
                <th className="text-right text-white/30 font-mono text-[11px] uppercase tracking-wider px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((a) => {
                const memberMembership = memberships.find(
                  (m) => m.userId === a.userId,
                );
                return (
                  <tr
                    key={a.userId}
                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/70 text-xs font-bold shrink-0">
                          {(a.user.name || a.user.email || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {a.user.name || "-"}
                          </p>
                          <p className="text-white/40 text-xs font-mono truncate">
                            {a.user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {memberMembership ? (
                        <p className="text-white/60 text-xs font-mono">
                          {memberMembership.studio.name}
                        </p>
                      ) : (
                        <span className="text-white/30 text-xs font-mono">
                          Tidak ada
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {memberMembership ? (
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            memberMembership.status === "active"
                              ? "bg-[#AFFF00]/20 text-[#AFFF00]"
                              : "bg-white/[0.08] text-white/60"
                          }`}
                        >
                          {memberMembership.status}
                        </span>
                      ) : (
                        <span className="text-white/20 text-xs font-mono">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
