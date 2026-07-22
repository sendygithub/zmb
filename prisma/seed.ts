import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const DATABASE_URL =
  "postgres://postgres.bpeydqaospcqgqwyibps:h4cvR7pRJSn4PA9M@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=no-verify";

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const ownerPassword = await bcrypt.hash("Owner123!", 10);
  const zinPassword = await bcrypt.hash("Zin123!", 10);
  const userPassword = await bcrypt.hash("User123!", 10);

  // ── OWNER ──────────────────────────────────────────────
  const owner = await prisma.user.upsert({
    where: { email: "owner@terongzumba.com" },
    update: {},
    create: {
      name: "Owner Terong Zumba",
      email: "owner@terongzumba.com",
      password: ownerPassword,
      role: "owner",
      phone: "081234567890",
    },
  });
  console.log(`✅ Owner created: ${owner.email}`);

  // ── STUDIO (Sanggar) ───────────────────────────────────
  const studio1 = await prisma.studio.create({
    data: {
      name: "Studio Binong",
      address: "Jl. Binong Permai No. 12, Karawaci, Tangerang",
      phone: "021-12345678",
      description: "Studio zumba utama dengan fasilitas lengkap",
      ownerId: owner.id,
    },
  });
  console.log(`✅ Studio created: ${studio1.name}`);

  const studio2 = await prisma.studio.create({
    data: {
      name: "Studio Gading Serpong",
      address: "Ruko Gading Serpong Blok A5 No. 8, Tangerang",
      phone: "021-87654321",
      description: "Cabang zumba di kawasan Gading Serpong",
      ownerId: owner.id,
    },
  });
  console.log(`✅ Studio created: ${studio2.name}`);

  // ── ZIN (Instruktur) ───────────────────────────────────
  const zin1 = await prisma.user.upsert({
    where: { email: "rina@terongzumba.com" },
    update: {},
    create: {
      name: "Mba Rina",
      email: "rina@terongzumba.com",
      password: zinPassword,
      role: "zin",
      phone: "081234567891",
      studioId: studio1.id,
    },
  });
  console.log(`✅ Zin created: ${zin1.email}`);

  const zin2 = await prisma.user.upsert({
    where: { email: "adi@terongzumba.com" },
    update: {},
    create: {
      name: "Mas Adi",
      email: "adi@terongzumba.com",
      password: zinPassword,
      role: "zin",
      phone: "081234567892",
      studioId: studio1.id,
    },
  });
  console.log(`✅ Zin created: ${zin2.email}`);

  const zin3 = await prisma.user.upsert({
    where: { email: "sinta@terongzumba.com" },
    update: {},
    create: {
      name: "Mba Sinta",
      email: "sinta@terongzumba.com",
      password: zinPassword,
      role: "zin",
      phone: "081234567893",
      studioId: studio2.id,
    },
  });
  console.log(`✅ Zin created: ${zin3.email}`);

  // ── USERS (10 users) ───────────────────────────────────
  const usersData = [
    { name: "User Zumba", email: "user@terongzumba.com" },
    { name: "Rizky Pratama", email: "rizky@example.com" },
    { name: "Maya Anggraini", email: "maya@example.com" },
    { name: "Budi Santoso", email: "budi@example.com" },
    { name: "Dian Permata", email: "dian@example.com" },
    { name: "Fajar Hidayat", email: "fajar@example.com" },
    { name: "Sari Dewi", email: "sari@example.com" },
    { name: "Andi Wijaya", email: "andi@example.com" },
    { name: "Rina Marlina", email: "rina.m@example.com" },
    { name: "Doni Kusuma", email: "doni@example.com" },
  ];

  const createdUsers = [];
  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        password: userPassword,
        role: "user",
      },
    });
    createdUsers.push(user);
    console.log(`✅ User created: ${user.email}`);
  }

  // ── CLASS SCHEDULES ────────────────────────────────────
  const schedulesData = [
    // Studio Binong - Senin
    {
      title: "Zumba Pagi",
      description: "Zumba energi tinggi buat ngawali hari dengan semangat",
      instructorId: zin1.id,
      instructor: "Mba Rina",
      studioId: studio1.id,
      dayOfWeek: 1,
      startTime: "07:00",
      endTime: "08:00",
      maxParticipants: 30,
      location: "Studio Binong",
      price: 35000,
    },
    {
      title: "Zumba Siang",
      description: "Zumba santai di jam istirahat, cocok buat yang WFH",
      instructorId: zin2.id,
      instructor: "Mas Adi",
      studioId: studio1.id,
      dayOfWeek: 1,
      startTime: "12:00",
      endTime: "13:00",
      maxParticipants: 25,
      location: "Studio Binong",
      price: 30000,
    },
    {
      title: "Zumba Malam",
      description: "Tutup hari dengan gerakan zumba yang seru",
      instructorId: zin1.id,
      instructor: "Mba Rina",
      studioId: studio1.id,
      dayOfWeek: 1,
      startTime: "19:00",
      endTime: "20:00",
      maxParticipants: 35,
      location: "Studio Binong",
      price: 40000,
    },
    // Studio Binong - Selasa
    {
      title: "Zumba Pagi",
      description: "Zumba pagi hari Selasa, bakar kalori bareng",
      instructorId: zin1.id,
      instructor: "Mba Rina",
      studioId: studio1.id,
      dayOfWeek: 2,
      startTime: "07:00",
      endTime: "08:00",
      maxParticipants: 30,
      location: "Studio Binong",
      price: 35000,
    },
    {
      title: "Zumba Malam",
      description: "Zumba malam Selasa, gerak sampe keringetan",
      instructorId: zin2.id,
      instructor: "Mas Adi",
      studioId: studio1.id,
      dayOfWeek: 2,
      startTime: "19:00",
      endTime: "20:00",
      maxParticipants: 35,
      location: "Studio Binong",
      price: 40000,
    },
    // Studio Binong - Rabu
    {
      title: "Zumba Pagi",
      description: "Rabu pagi, saatnya zumba biar makin fit",
      instructorId: zin1.id,
      instructor: "Mba Rina",
      studioId: studio1.id,
      dayOfWeek: 3,
      startTime: "07:00",
      endTime: "08:00",
      maxParticipants: 30,
      location: "Studio Binong",
      price: 35000,
    },
    {
      title: "Zumba Siang",
      description: "Zumba siang Rabu, isi ulang energi",
      instructorId: zin2.id,
      instructor: "Mas Adi",
      studioId: studio1.id,
      dayOfWeek: 3,
      startTime: "12:00",
      endTime: "13:00",
      maxParticipants: 25,
      location: "Studio Binong",
      price: 30000,
    },
    {
      title: "Zumba Malam",
      description: "Rabu malam zumba seru bareng temen-temen",
      instructorId: zin1.id,
      instructor: "Mba Rina",
      studioId: studio1.id,
      dayOfWeek: 3,
      startTime: "19:00",
      endTime: "20:00",
      maxParticipants: 35,
      location: "Studio Binong",
      price: 40000,
    },
    // Studio Gading Serpong - Kamis
    {
      title: "Zumba Pagi Gading",
      description: "Zumba pagi di Gading Serpong",
      instructorId: zin3.id,
      instructor: "Mba Sinta",
      studioId: studio2.id,
      dayOfWeek: 4,
      startTime: "07:00",
      endTime: "08:00",
      maxParticipants: 25,
      location: "Studio Gading Serpong",
      price: 40000,
    },
    {
      title: "Zumba Malam Gading",
      description: "Zumba malam di Gading Serpong",
      instructorId: zin3.id,
      instructor: "Mba Sinta",
      studioId: studio2.id,
      dayOfWeek: 4,
      startTime: "19:00",
      endTime: "20:00",
      maxParticipants: 30,
      location: "Studio Gading Serpong",
      price: 45000,
    },
    // Weekend
    {
      title: "Zumba Pagi Akhir Pekan",
      description: "Sabtu pagi, zumba santai buat ngisi weekend",
      instructorId: zin2.id,
      instructor: "Mas Adi",
      studioId: studio1.id,
      dayOfWeek: 6,
      startTime: "08:00",
      endTime: "09:00",
      maxParticipants: 40,
      location: "Studio Binong",
      price: 50000,
    },
    {
      title: "Zumba Spesial Minggu",
      description: "Minggu pagi, zumba spesial buat keluarga",
      instructorId: zin1.id,
      instructor: "Mba Rina",
      studioId: studio1.id,
      dayOfWeek: 0,
      startTime: "08:00",
      endTime: "09:00",
      maxParticipants: 40,
      location: "Studio Binong",
      price: 50000,
    },
  ];

  const createdSchedules = [];
  for (const s of schedulesData) {
    const schedule = await prisma.classSchedule.create({ data: s });
    createdSchedules.push(schedule);
    console.log(
      `✅ Schedule created: ${schedule.title} (day ${schedule.dayOfWeek})`,
    );
  }

  // ── MEMBERSHIPS ────────────────────────────────────────
  const membershipsData = [
    { userId: createdUsers[0].id, studioId: studio1.id },
    { userId: createdUsers[1].id, studioId: studio1.id },
    { userId: createdUsers[2].id, studioId: studio2.id },
    { userId: createdUsers[3].id, studioId: studio1.id },
    { userId: createdUsers[4].id, studioId: studio2.id },
    { userId: createdUsers[5].id, studioId: studio1.id },
  ];

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);

  for (const m of membershipsData) {
    await prisma.membership.create({
      data: {
        userId: m.userId,
        studioId: m.studioId,
        status: "active",
        startDate: new Date(),
        endDate,
      },
    });
  }
  console.log(`✅ ${membershipsData.length} memberships created`);

  // ── TRANSACTIONS ───────────────────────────────────────
  const transactionsData = [
    {
      userId: createdUsers[0].id,
      amount: 300000,
      type: "membership",
      description: "Membership 3 bulan Studio Binong",
    },
    {
      userId: createdUsers[1].id,
      amount: 300000,
      type: "membership",
      description: "Membership 3 bulan Studio Binong",
    },
    {
      userId: createdUsers[2].id,
      amount: 350000,
      type: "membership",
      description: "Membership 3 bulan Studio Gading Serpong",
    },
    {
      userId: createdUsers[3].id,
      amount: 300000,
      type: "membership",
      description: "Membership 3 bulan Studio Binong",
    },
    {
      userId: createdUsers[4].id,
      amount: 350000,
      type: "membership",
      description: "Membership 3 bulan Studio Gading Serpong",
    },
    {
      userId: createdUsers[5].id,
      amount: 300000,
      type: "membership",
      description: "Membership 3 bulan Studio Binong",
    },
    {
      userId: createdUsers[0].id,
      amount: 35000,
      type: "class_payment",
      description: "Zumba Pagi - Studio Binong",
    },
    {
      userId: createdUsers[1].id,
      amount: 40000,
      type: "class_payment",
      description: "Zumba Malam - Studio Binong",
    },
    {
      userId: createdUsers[2].id,
      amount: 40000,
      type: "class_payment",
      description: "Zumba Pagi Gading - Studio Gading Serpong",
    },
  ];

  for (const t of transactionsData) {
    await prisma.transaction.create({ data: t });
  }
  console.log(`✅ ${transactionsData.length} transactions created`);

  // ── ATTENDANCES ────────────────────────────────────────
  const today = new Date();
  let attendanceCount = 0;

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() - dayOffset);
    const dayOfWeek = date.getDay();

    const daySchedules = createdSchedules.filter(
      (s) => s.dayOfWeek === dayOfWeek,
    );

    for (const schedule of daySchedules) {
      const attendingUsers = createdUsers.filter(() => Math.random() < 0.75);

      for (const user of attendingUsers) {
        const rand = Math.random();
        const status = rand < 0.7 ? "hadir" : rand < 0.85 ? "izin" : "alpha";

        await prisma.attendance.upsert({
          where: {
            userId_scheduleId_date: {
              userId: user.id,
              scheduleId: schedule.id,
              date,
            },
          },
          update: { status },
          create: {
            userId: user.id,
            scheduleId: schedule.id,
            date,
            status,
          },
        });
        attendanceCount++;
      }
    }
  }
  console.log(`✅ ${attendanceCount} attendances created`);

  // ── Summary ────────────────────────────────────────────
  console.log("\n📋 Seed Summary:");
  console.log("   Owner: owner@terongzumba.com / Owner123!");
  console.log("   Zin:   rina@terongzumba.com / Zin123!");
  console.log("   Zin:   adi@terongzumba.com / Zin123!");
  console.log("   Zin:   sinta@terongzumba.com / Zin123!");
  console.log("   User:  user@terongzumba.com / User123!");
  console.log(`   Total users: ${createdUsers.length + 4}`);
  console.log(`   Total studios: 2`);
  console.log(`   Total schedules: ${createdSchedules.length}`);
  console.log(`   Total memberships: ${membershipsData.length}`);
  console.log(`   Total transactions: ${transactionsData.length}`);
  console.log(`   Total attendances: ${attendanceCount}`);
  console.log("\n🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
