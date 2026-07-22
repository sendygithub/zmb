import { auth } from "@/lib/auth";
import { ChevronRight } from "lucide-react";
import ProfileView from "@/components/user/ProfileView";

export default async function UserProfilePage() {
  const session = await auth();
  const user = session?.user as any;

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>User</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Profile</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-3xl">
        <ProfileView user={user} />
      </main>
    </>
  );
}
