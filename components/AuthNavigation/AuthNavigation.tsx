"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import TagsMenu from "../TagsMenu/TagsMenu";
import { TagList } from "@/types/note";
export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const tags: TagList[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  const handleLogout = async () => {
    await logout();

    clearIsAuthenticated();
    router.push("/sign-in");
  };
  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
      <TagsMenu tags={tags} />
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <a href="/sign-in" className={css.navigationLink}>
          Login
        </a>
      </li>

      <li className={css.navigationItem}>
        <a href="/sign-up" className={css.navigationLink}>
          Sign up
        </a>
      </li>
    </>
  );
}
