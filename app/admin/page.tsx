import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import AdminDashboardView from "@/components/admin/AdminDashboardView";

export default async function AdminDashboard() {
  const totalUsers = await prisma.user.count();
  const totalOwners = await prisma.user.count({ where: { role: "owner" } });
  const totalZin = await prisma.user.count({ where: { role: "zin" } });
  const totalRegularUsers = await prisma.user.count({
    where: { role: "user" },
  });
  const totalSchedules = await prisma.classSchedule.count({
    where: { isActive: true },
  });
  const totalAttendances = await prisma.attendance.count();
  const totalStudios = await prisma.studio.count();
  const totalTransactions = await prisma.transaction.count();
  const totalRevenue = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { status: "completed" },
  });

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentTransactions = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true },
  });

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Owner</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Dashboard</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-6xl">
        <AdminDashboardView
          totalStudios={totalStudios}
          totalUsers={totalUsers}
          totalSchedules={totalSchedules}
          totalRevenue={totalRevenue._sum.amount || 0}
          totalOwners={totalOwners}
          totalZin={totalZin}
          totalRegularUsers={totalRegularUsers}
          totalAttendances={totalAttendances}
          totalTransactions={totalTransactions}
          recentUsers={recentUsers}
          recentTransactions={recentTransactions}
        />
      </main>
    </>
  );
}
