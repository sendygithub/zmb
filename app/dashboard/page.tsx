import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  // Redirect based on role
  if (user.role === "owner") redirect("/admin");
  if (user.role === "zin") redirect("/zin");
  if (user.role === "user") redirect("/user");

  redirect("/login");
}
