"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await signIn.email({ email, password });

    setLoading(false);
    if (signInError) {
      setError(signInError.message ?? "Login failed");
      return;
    }
    router.push("/");
  }

  function fillDemo() {
    setEmail("demo@eventide.com");
    setPassword("demo1234");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-twilight-900 p-8"
      >
        <h1 className="text-2xl font-bold text-amber-400">Log in</h1>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md bg-twilight-800 px-3 py-2 text-white outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md bg-twilight-800 px-3 py-2 text-white outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-amber-400 py-2 font-semibold text-twilight-950 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <button
          type="button"
          onClick={fillDemo}
          className="w-full rounded-md border border-dusk-400 py-2 text-sm text-dusk-400"
        >
          Use demo credentials
        </button>

        <p className="text-center text-sm text-white/60">
          No account?{" "}
          <Link href="/register" className="text-amber-400">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}