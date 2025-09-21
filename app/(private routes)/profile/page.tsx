import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/api/serverApi";
import type { User } from "@/types/user";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Profile Page",
  description: "User profile page of NoteHub application",
};

export default async function ProfilePage() {

  const user: User = await getCurrentUser();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "/avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}


