import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/lib/auth-actions";
import { Users, Shield, Activity, Settings } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  const totalUsers = await prisma.user.count();
  const totalAdmins = await prisma.user.count({
    where: { role: "admin" },
  });
  const totalRegularUsers = await prisma.user.count({
    where: { role: "user" },
  });

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight">
              <span className="text-white">Terong</span>
              <span className="text-[#AFFF00]">Zumba</span>
            </span>
            <span className="bg-[#AFFF00] text-[#121212] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#AFFF00]/20 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#AFFF00]" />
              </div>
              <span className="text-white/80 font-mono text-sm">
                {user.name || user.email}
              </span>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors font-mono text-sm"
              >
                <span className="text-sm">Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-white/60 font-mono text-sm mt-2">
            Kelola pengguna dan pengaturan Terong Zumba
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/20 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-2xl font-black text-white">{totalUsers}</h3>
            <p className="text-white/40 font-mono text-xs mt-1">
              Total Pengguna
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/20 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-2xl font-black text-white">
              {totalRegularUsers}
            </h3>
            <p className="text-white/40 font-mono text-xs mt-1">
              Pengguna Biasa
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#AFFF00]/20 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-[#AFFF00]" />
            </div>
            <h3 className="text-2xl font-black text-white">{totalAdmins}</h3>
            <p className="text-white/40 font-mono text-xs mt-1">Admin</p>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white">Pengguna Terbaru</h2>
            <Settings className="w-5 h-5 text-white/40" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 font-mono text-xs pb-3">
                    Nama
                  </th>
                  <th className="text-left text-white/40 font-mono text-xs pb-3">
                    Email
                  </th>
                  <th className="text-left text-white/40 font-mono text-xs pb-3">
                    Role
                  </th>
                  <th className="text-left text-white/40 font-mono text-xs pb-3">
                    Bergabung
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} className="border-b border-white/5">
                    <td className="py-3 text-white font-mono text-sm">
                      {u.name || "-"}
                    </td>
                    <td className="py-3 text-white/60 font-mono text-sm">
                      {u.email}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          u.role === "admin"
                            ? "bg-[#AFFF00] text-[#121212]"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 text-white/40 font-mono text-sm">
                      {new Date(u.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
