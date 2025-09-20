"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/clientApi";
import type { ApiErrorResponse } from "@/types/api";
import css from "./SignUp.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await registerUser(email, password);
      router.push("/profile");
    } catch (err: unknown) {

      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        const apiMessage = err.response?.data?.message;
        setError(apiMessage ?? "Registration failed");
      } else if (err instanceof Error) {

        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={css.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={css.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
