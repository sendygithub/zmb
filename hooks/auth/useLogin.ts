"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/auth-actions";

export function useLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const result = await loginAction(formData);

    if (result.success) {
      router.push(result.redirectTo || "/dashboard");
      router.refresh();
      return;
    }

    setError(result.error);
    setIsLoading(false);
  };

  return {
    showPassword,
    togglePassword,
    isLoading,
    error,
    handleSubmit,
  };
}
