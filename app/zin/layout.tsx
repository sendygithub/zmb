import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ZinSidebar from "@/components/zin/ZinSidebar";

export default async function ZinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  if (user.role !== "zin") {
    if (user.role === "owner") redirect("/admin");
    if (user.role === "user") redirect("/user");
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0D0F0A] text-white flex">
      <ZinSidebar user={user} />
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </div>
  );
}
