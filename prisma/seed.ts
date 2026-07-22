import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@terongzumba.com" },
    update: {},
    create: {
      name: "Admin Terong Zumba",
      email: "admin@terongzumba.com",
      password: adminPassword,
      role: "admin",
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // Create regular user
  const userPassword = await bcrypt.hash("User123!", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@terongzumba.com" },
    update: {},
    create: {
      name: "User Zumba",
      email: "user@terongzumba.com",
      password: userPassword,
      role: "user",
    },
  });
  console.log(`✅ User created: ${user.email}`);

  console.log("\n📋 Seed Summary:");
  console.log("   Admin: admin@terongzumba.com / Admin123!");
  console.log("   User:  user@terongzumba.com / User123!");
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
