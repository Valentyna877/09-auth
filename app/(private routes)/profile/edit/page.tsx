"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";

export default function EditProfilePage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        setUsername(user.username);
        setEmail(user.email);
        setAvatar(user.avatar && user.avatar.trim() !== ""
          ? user.avatar
          : "https://ac.goit.global/default-avatar.png");
      } catch {
        setError("Failed to load user data");
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch {
      setError("Failed to update profile");
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Link href="/profile" className={css.editProfileButton}>
          Back to Profile
        </Link>
        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <p>Email: {email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>Save</button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}