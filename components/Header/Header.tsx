"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {isAuthenticated && (
            <>
              <li>
                <Link
                  href="/"
                  className={pathname === "/" ? css.active : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/notes/filter/all"
                  className={pathname.startsWith("/notes/filter") ? css.active : ""}
                >
                  Notes
                </Link>
              </li>
            </>
          )}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}