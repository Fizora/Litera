"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const email = input.includes("@") ? input : `siswa${input}@gmail.com`;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Login gagal. Cek kembali NISN/Email dan Password.");
    } else {
      router.push("/beranda");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-main">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-text">Litera</h1>
        </div>

        {/* Login Card */}
        <div className="px-8 mt-2">
          <h2 className="text-base font-semibold text-center text-primary-text mb-6">
            Sign in to CONNECT
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Email atau NISN"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-50 focus:outline-none text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-50 focus:outline-none text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full text-center p-3 justify-center border border-primary-300 text-primary-300 hover:bg-primary-300/10 rounded-full font-medium transition-colors inline-flex items-center gap-2"
              >
                Login
              </button>
            </div>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-text">
              Are you a new user?{" "}
              <Link
                href="/register"
                className="font-medium text-primary-text hover:text-secondary-text"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
