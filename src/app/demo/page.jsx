"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const COLOR_PRESETS = {
  primary: [
    { name: "Biru Profesional", value: "#2563eb" },
    { name: "Hijau Edukatif", value: "#16a34a" },
    { name: "Ungu Kreatif", value: "#7c3aed" },
    { name: "Merah Energik", value: "#dc2626" },
    { name: "Teal Modern", value: "#0d9488" },
  ],
  secondary: [
    { name: "Biru Muted", value: "#1e40af" },
    { name: "Hijau Muted", value: "#15803d" },
    { name: "Ungu Muted", value: "#6d28d9" },
    { name: "Merah Muted", value: "#b91c1c" },
    { name: "Teal Muted", value: "#0f766e" },
  ],
  background: [
    { name: "Putih Bersih", value: "#ffffff" },
    { name: "Abu-abu Terang", value: "#f3f4f6" },
    { name: "Hitam Elegan", value: "#000000" },
    { name: "Abu-abu Gelap", value: "#1f2937" },
  ],
  text: [
    { name: "Hitam", value: "#000000" },
    { name: "Abu-abu Gelap", value: "#374151" },
    { name: "Putih", value: "#ffffff" },
    { name: "Abu-abu Terang", value: "#f9fafb" },
  ],
  card: [
    // Tambahan preset warna untuk card
    { name: "Putih", value: "#ffffff" },
    { name: "Biru Muted", value: "#f0f9ff" },
    { name: "Hijau Muted", value: "#f0fdf4" },
    { name: "Ungu Muted", value: "#faf5ff" },
    { name: "Merah Muted", value: "#fef2f2" },
    { name: "Amber Muted", value: "#fffbeb" },
    { name: "Abu-abu Terang", value: "#f9fafb" },
    { name: "Abu-abu Sedang", value: "#f3f4f6" },
  ],
};

export default function ThemeColorChanger() {
  const supabase = createClient();

  const [selectedColors, setSelectedColors] = useState({
    primary_color: "#2563eb",
    background_color: "#ffffff",
    primary_text: "#000000",
    primary_button: "#2563eb",
    secondary_button: "#1e40af",
    secondary_text: "#374151",
    card_background: "#ffffff",
  });

  useEffect(() => {
    const fetchColors = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select(
          "primary_color, background_color, primary_text, primary_button, secondary_button, secondary_text, card_background"
        )
        .eq("id", "global")
        .single();

      if (!error && data) {
        setSelectedColors(data);
      }
    };

    fetchColors();
  }, []);

  const updateColor = async (field, value) => {
    const newColors = { ...selectedColors, [field]: value };
    setSelectedColors(newColors);

    const { error } = await supabase
      .from("settings")
      .update({ [field]: value })
      .eq("id", "global");

    if (!error) {
      document.documentElement.style.setProperty(
        `--${field.replace("_", "-")}`,
        value
      );
    } else {
      console.error(`Gagal menyimpan ${field}:`, error.message);
    }
  };

  const renderColorSection = (title, field, presetType) => {
    return (
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-3">{title}</h2>
        <div className="flex flex-wrap gap-3">
          {COLOR_PRESETS[presetType].map((color, index) => (
            <button
              key={index}
              className={`w-12 h-12 rounded-lg transition-all duration-200 flex items-center justify-center ${
                selectedColors[field] === color.value
                  ? "ring-2 ring-offset-2 ring-gray-400 scale-105"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => updateColor(field, color.value)}
              title={color.name}
            >
              {selectedColors[field] === color.value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Terpilih:{" "}
          {COLOR_PRESETS[presetType].find(
            (c) => c.value === selectedColors[field]
          )?.name || "Custom"}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Customisasi Tema</h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Pratinjau Tema</h2>
        <div
          className="p-6 rounded-lg border"
          style={{ backgroundColor: selectedColors.background_color }}
        >
          <div className="mb-4">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: selectedColors.primary_text }}
            >
              Judul Contoh
            </h3>
            <p style={{ color: selectedColors.secondary_text }}>
              Ini adalah contoh teks dengan warna sekunder. Warna ini digunakan
              untuk teks yang kurang penting.
            </p>
          </div>

          {/* Tambahan preview card */}
          <div
            className="p-6 rounded-lg border mb-4 shadow-sm"
            style={{ backgroundColor: selectedColors.card_background }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4
                style={{ color: selectedColors.primary_text }}
                className="font-medium"
              >
                Contoh Card
              </h4>
            </div>
            <p
              style={{ color: selectedColors.secondary_text }}
              className="text-sm"
            >
              Ini adalah contoh tampilan card dengan background yang dipilih.
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="px-4 py-2 rounded-lg font-medium"
              style={{
                backgroundColor: selectedColors.primary_button,
                color: "#ffffff",
              }}
            >
              Tombol Utama
            </button>
            <button
              className="px-4 py-2 rounded-lg font-medium border"
              style={{
                backgroundColor: selectedColors.secondary_button,
                color: "#ffffff",
              }}
            >
              Tombol Sekunder
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {renderColorSection("Warna Utama", "primary_color", "primary")}
        {renderColorSection(
          "Warna Background",
          "background_color",
          "background"
        )}
        {renderColorSection("Warna Card", "card_background", "card")}{" "}
        {/* Tambahan section card */}
        {renderColorSection("Warna Teks Utama", "primary_text", "text")}
        {renderColorSection("Warna Teks Sekunder", "secondary_text", "text")}
        {renderColorSection("Warna Tombol Utama", "primary_button", "primary")}
        {renderColorSection(
          "Warna Tombol Sekunder",
          "secondary_button",
          "secondary"
        )}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Perubahan akan langsung diterapkan ke seluruh aplikasi.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Simpan & Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
