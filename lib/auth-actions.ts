"use server";

import { signIn, signOut } from "./auth";

export async function loginAction(formData: FormData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: "Email atau password salah" };
    }

    // Get user role from the session
    const { auth } = await import("./auth");
    const session = await auth();
    const user = session?.user as any;

    let redirectTo = "/dashboard";
    if (user?.role === "owner") redirectTo = "/admin";
    else if (user?.role === "zin") redirectTo = "/zin";
    else if (user?.role === "user") redirectTo = "/user";

    return { success: true, error: null, redirectTo };
  } catch (error: any) {
    if (error?.type === "CredentialsSignin") {
      return { success: false, error: "Email atau password salah" };
    }
    return { success: false, error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { prisma } = await import("./prisma");
    const bcrypt = await import("bcryptjs");

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
