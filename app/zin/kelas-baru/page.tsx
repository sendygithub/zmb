import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import NewClassForm from "./NewClassForm";

export default async function ZinKelasBaruPage() {
  const session = await auth();
  const user = session?.user as any;

  // Get studios where this instructor is assigned
  const studios = await prisma.studio.findMany({
    where: { instructors: { some: { id: user.id } } },
  });

  return (
    <>
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-mono text-white/40">
          <span>Instruktur</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">Buat Kelas Baru</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Buat Kelas Baru
          </h1>
          <p className="text-white/40 font-mono text-sm mt-1.5">
            Tambah jadwal kelas zumba baru
          </p>
        </div>

        <NewClassForm
          studios={studios}
          instructorId={user.id}
          instructorName={user.name}
        />
      </main>
    </>
  );
}
