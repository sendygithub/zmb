import { auth } from "@/lib/auth";
import { ChevronRight, Mail, User, Shield } from "lucide-react";

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
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Profile
          </h1>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="p-8 text-center border-b border-white/[0.06]">
            <div className="w-20 h-20 rounded-full bg-[#AFFF00]/15 flex items-center justify-center text-[#AFFF00] text-2xl font-black mx-auto mb-4">
              {(user.name || user.email || "U").charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-white">
              {user.name || "User"}
            </h2>
            <p className="text-white/40 font-mono text-sm mt-1">{user.email}</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 px-4 py-3 bg-white/[0.03] rounded-xl">
              <User className="w-5 h-5 text-white/40" />
              <div>
                <p className="text-xs font-mono text-white/40">Nama</p>
                <p className="text-sm text-white">{user.name || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 bg-white/[0.03] rounded-xl">
              <Mail className="w-5 h-5 text-white/40" />
              <div>
                <p className="text-xs font-mono text-white/40">Email</p>
                <p className="text-sm text-white">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 bg-white/[0.03] rounded-xl">
              <Shield className="w-5 h-5 text-white/40" />
              <div>
                <p className="text-xs font-mono text-white/40">Role</p>
                <span className="bg-white/[0.08] text-white/60 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
