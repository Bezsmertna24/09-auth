import css from "./Profile.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "..//..//..//lib/store/authStore";

export default function ProfilePage() {
  const { user } = useAuthStore();

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
            src="/avatar.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username || "Anonymous"}</p>
          <p>Email: {user?.email || "No email"}</p>
        </div>
      </div>
    </main>
  );
}

