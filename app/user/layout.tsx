import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserSidebar from "@/components/user/UserSidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  if (user.role !== "user") {
    if (user.role === "owner") redirect("/admin");
    if (user.role === "zin") redirect("/zin");
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0D0F0A] text-white flex">
      <UserSidebar user={user} />
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </div>
  );
}
