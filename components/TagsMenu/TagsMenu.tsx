"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";
type Props = {
  tags: string[];
};
export default function TagsMenu({ tags }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={toggle}
            >
              All tags
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                className={css.menuLink}
                href={`/notes/filter/${tag}`}
                onClick={toggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
