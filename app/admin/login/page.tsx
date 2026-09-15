"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          try {
            const res = await fetch("/api/admin/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password }),
            });
            if (!res.ok) {
              const body = await res.json().catch(() => ({}));
              throw new Error(body.error || "Login failed");
            }
            router.push("/admin");
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
          } finally {
            setLoading(false);
          }
        }}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl"
      >
        <div className="text-2xl font-semibold">
          Divine<span className="gold">Stays</span>
        </div>
        <p className="mt-1 text-sm text-[#6f6a61]">Admin login</p>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="mt-6 w-full rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3 outline-none focus:border-[#c9953d]"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-[#1b1a18] px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
