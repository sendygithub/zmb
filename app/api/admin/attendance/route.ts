import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, scheduleId, date, status } = await req.json();

    const attendance = await prisma.attendance.upsert({
      where: {
        userId_scheduleId_date: { userId, scheduleId, date: new Date(date) },
      },
      update: { status },
      create: {
        userId,
        scheduleId,
        date: new Date(date),
        status,
      },
    });

    return NextResponse.json({ success: true, attendance });
  } catch {
    return NextResponse.json(
      { error: "Failed to record attendance" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    await prisma.attendance.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete attendance" },
      { status: 500 },
    );
  }
}
