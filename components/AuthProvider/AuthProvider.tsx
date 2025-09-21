"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getSession, getCurrentUser } from "@/lib/api/clientApi";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession();

        if (session.data) {
          const user = await getCurrentUser();
          setUser(user);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}


