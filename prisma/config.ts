import { defineConfig } from "@prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  datasourceUrl: "file:./dev.db",
});
