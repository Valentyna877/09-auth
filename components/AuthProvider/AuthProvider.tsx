"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error("Session check failed:", error);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
}