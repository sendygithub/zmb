"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/lib/auth-actions";

export function useRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const result = await registerAction(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return {
    showPassword,
    togglePassword,
    isLoading,
    error,
    success,
    password,
    setPassword,
    passwordChecks,
    handleSubmit,
  };
}
