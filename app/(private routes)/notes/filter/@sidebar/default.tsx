import Link from "next/link";
import css from "./Sidebar.module.css";
import type { TagList } from "@/types/note";

export default async function SidebarNotes() {
  // await new Promise((r) => setTimeout(r, 3000));
  const tags: TagList[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link className={css.menuLink} href={`/notes/filter/All`}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link className={css.menuLink} href={`/notes/filter/${tag}`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
