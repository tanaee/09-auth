"use client";

import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function Edit() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? "");
      setEmail(user.email ?? "");
      setAvatar(user.avatar ?? "");
    });
  }, []);

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = await updateMe({ username });
    setUser(updatedUser);
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar || "/default-avatar.png"}
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
