"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "../../lib/store/authStore";
import { getSession } from "../../lib/api/clientApi";
// import type { User } from "@/types/user";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await getSession();
        if (response.data) setUser(response.data);
        else clearAuth();
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };
    check();
  }, [setUser, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}

