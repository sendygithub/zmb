import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  if (user.role !== "owner") {
    if (user.role === "zin") redirect("/zin");
    if (user.role === "user") redirect("/user");
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0D0F0A] text-white flex">
      <AdminSidebar user={user} />
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </div>
  );
}
