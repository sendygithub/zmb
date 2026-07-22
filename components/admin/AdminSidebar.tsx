"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/auth-actions";
import {
  Users,
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Building2,
  CreditCard,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Sanggar", icon: Building2, href: "/admin/sanggar" },
  { label: "Pengguna", icon: Users, href: "/admin/pengguna" },
  { label: "Jadwal Kelas", icon: CalendarDays, href: "/admin/jadwal" },
  { label: "Absensi", icon: ClipboardList, href: "/admin/absensi" },
  { label: "Transaksi", icon: CreditCard, href: "/admin/transaksi" },
];

export default function AdminSidebar({
  user,
}: {
  user: { name?: string; email?: string; role?: string };
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 flex-col border-r border-white/[0.06] bg-[#0F110B] shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight">
            <span className="text-white">Terong</span>
            <span className="text-[#AFFF00]">Zumba</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#AFFF00]/10 text-[#AFFF00]"
                  : "text-white/50 hover:text-white/90 hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className="w-4 h-4" strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03]">
          <div className="w-8 h-8 rounded-full bg-[#AFFF00]/15 flex items-center justify-center text-[#AFFF00] text-xs font-bold shrink-0">
            {(user.name || user.email || "O").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">
              {user.name || "Owner"}
            </p>
            <p className="text-[11px] text-white/40 truncate">{user.email}</p>
          </div>
        </div>
        <form action={logoutAction} className="mt-1">
          <button
            type="submit"
            className="w-full text-left px-3 py-2 text-[13px] text-white/35 hover:text-white/70 transition-colors font-mono"
          >
            Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
