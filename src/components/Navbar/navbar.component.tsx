"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/modules/navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.navbar}`}
    >
      <div className="container">
        <Link href="/" className="navbar-brand">
          🌤️ Test Work 13
        </Link>
        <div className="navbar-nav">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? styles.active : ""}`}
          >
            Главная
          </Link>
          <Link
            href="/favorites"
            className={`nav-link ${
              pathname === "/favorites" ? styles.active : ""
            }`}
          >
            Избранное
          </Link>
        </div>
      </div>
    </nav>
  );
}
