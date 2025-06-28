"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterSiswaForm() {
  const supabase = createClient();

  const [nisn, setNisn] = useState("");
  const [password, setPassword] = useState("");
  const [siswaData, setSiswaData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (nisn.length > 5) {
        const { data, error } = await supabase
          .from("siswa")
          .select("id, name, place_of_birth, date_of_birth, class, akun_id")
          .eq("nisn", nisn)
          .single();

        if (error || !data) {
          setSiswaData(null);
          setMessage("NISN tidak ditemukan.");
          return;
        }

        if (data.akun_id) {
          setSiswaData(null);
          setMessage("Akun untuk NISN ini sudah terdaftar.");
          return;
        }

        setSiswaData(data);
        setMessage("");
      } else {
        setSiswaData(null);
        setMessage("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [nisn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!siswaData) {
      setMessage("NISN tidak valid.");
      setLoading(false);
      return;
    }

    const email = `siswa${nisn}@gmail.com`;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            full_name: siswaData.name,
            class: siswaData.class,
            role: "siswa",
          },
        },
      }
    );

    if (signUpError) {
      setMessage("Gagal membuat akun: " + signUpError.message);
      setLoading(false);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      setMessage("Gagal mendapatkan user ID.");
      setLoading(false);
      return;
    }

    await supabase
      .from("siswa")
      .update({
        akun_id: userId,
      })
      .eq("id", siswaData.id);

    setMessage("Registrasi berhasil! Akun siswa telah terhubung.");
    router.push("/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-main">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-text">Litera</h1>
        </div>

        <div className="px-8 mt-2">
          <h2 className="text-base font-semibold text-center text-primary-text mb-6">
            Registrasi Siswa
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nisn"
              placeholder="NISN"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm"
            />

            {siswaData && (
              <>
                <input
                  type="text"
                  value={siswaData.name}
                  readOnly
                  className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm bg-gray-100"
                />
                <input
                  type="text"
                  value={siswaData.place_of_birth}
                  readOnly
                  className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm bg-gray-100"
                />
                <input
                  type="text"
                  value={siswaData.date_of_birth}
                  readOnly
                  className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm bg-gray-100"
                />
                <input
                  type="text"
                  value={siswaData.class}
                  readOnly
                  className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm bg-gray-100"
                />
              </>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-sm"
            />

            <button
              type="submit"
              disabled={loading || !siswaData}
              className="w-full px-6 py-3 border border-primary-300 text-primary-300 hover:bg-primary-300/10 rounded-full font-medium transition-colors"
            >
              {loading ? "Memproses..." : "Register"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-secondary-text">
              {message}
            </p>
          )}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-secondary-text">
            Are you a have akun user?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-text hover:text-secondary-text"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
