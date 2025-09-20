"use client";

import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <Link href="/">NoteHub</Link>
      </div>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li>
            <Link href="/notes" className={css.navLink}>Notes</Link>
          </li>
          <li>
            <Link href="/profile" className={css.navLink}>Profile</Link>
          </li>
        </ul>
        <AuthNavigation />
      </nav>
    </header>
  );
}
