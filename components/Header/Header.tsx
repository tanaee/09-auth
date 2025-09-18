import Link from "next/link";
import css from "./Header.module.css";

import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.navigationLink}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>

          <AuthNavigation />
          <li className={css.navigationItem}></li>
        </ul>
      </nav>
    </header>
  );
}
