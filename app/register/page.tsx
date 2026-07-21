"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error: signUpError } = await signUp.email({ name, email, password });

        setLoading(false);
        if (signUpError) {
            setError(signUpError.message ?? "Registration failed");
            return;
        }
        router.push("/");
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-xl bg-twilight-900 p-8"
            >
                <h1 className="text-2xl font-bold text-amber-400">Create account</h1>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-md bg-twilight-800 px-3 py-2 text-white outline-none"
                />
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
                    placeholder="Password (min 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full rounded-md bg-twilight-800 px-3 py-2 text-white outline-none"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full rounded-md bg-amber-400 py-2 font-semibold text-twilight-950 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="text-center text-sm text-white/60">
                    Already have an account?{" "}
                    <a href="/login" className="text-amber-400">
                        Log in
                    </a>
                </p>
            </form>
        </main>
    );
}