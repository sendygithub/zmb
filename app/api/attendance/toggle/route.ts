import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  if (user.role !== "user") {
    return NextResponse.json(
      { error: "Only users can attend" },
      { status: 403 },
    );
  }

  const { scheduleId, date } = await req.json();

  if (!scheduleId || !date) {
    return NextResponse.json(
      { error: "Missing scheduleId or date" },
      { status: 400 },
    );
  }

  try {
    // Check if already attended
    const existing = await prisma.attendance.findUnique({
      where: {
        userId_scheduleId_date: {
          userId: user.id,
          scheduleId,
          date: new Date(date),
        },
      },
    });

    if (existing) {
      // Cancel attendance
      await prisma.attendance.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ status: "cancelled" });
    }

    // Check capacity
    const schedule = await prisma.classSchedule.findUnique({
      where: { id: scheduleId },
      include: {
        attendances: {
          where: { date: new Date(date), status: "hadir" },
        },
      },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 },
      );
    }

    if (schedule.attendances.length >= schedule.maxParticipants) {
      return NextResponse.json({ error: "Kelas sudah penuh" }, { status: 400 });
    }

    // Create attendance
    await prisma.attendance.create({
      data: {
        userId: user.id,
        scheduleId,
        date: new Date(date),
        status: "hadir",
      },
    });

    return NextResponse.json({ status: "attending" });
  } catch (error) {
    console.error("Attendance toggle error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
