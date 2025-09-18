"use client";

import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Edit() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? "");
      setEmail(user.email ?? "");
    });
  }, []);

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ username });
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="/my-avatar.png.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              value={username}
              type="text"
              className={css.input}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
