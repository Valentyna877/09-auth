"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={`${css.navigationLink} ${pathname === "/profile" ? css.active : ""
                }`}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.username ? user.username : user?.email}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              LogOut
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
              <Link
                href="/sign-in"
                prefetch={false}
                className={`${css.navigationLink} ${pathname === "/sign-in" ? css.active : ""
                  }`}>
              LogIn
            </Link>
          </li>
          <li className={css.navigationItem}>
              <Link
                href="/sign-up"
                prefetch={false}
                className={`${css.navigationLink} ${pathname === "/sign-up" ? css.active : ""
                  }`}>
              Sign Up
            </Link>
          </li>
        </>
      )}
    </>
  );
}