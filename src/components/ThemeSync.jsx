"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ThemeSync() {
  useEffect(() => {
    const supabase = createClient();

    const adjustColor = (hex, percent) => {
      // Tambahkan validasi hex color
      if (!hex || typeof hex !== "string") return "#ffffff";
      const hexValue = hex.startsWith("#") ? hex.slice(1) : hex;
      if (!/^[0-9A-Fa-f]{6}$/i.test(hexValue)) return "#ffffff";

      const num = parseInt(hexValue, 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.min(255, Math.max(0, (num >> 16) + amt));
      const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
      const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
      return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
    };

    const applyColors = (colors) => {
      console.log("Menerapkan warna:", colors); // Debugging
      const root = document.documentElement;
      const {
        primary_color,
        secondary_color,
        background_color,
        primary_text,
        secondary_text,
        primary_button,
        secondary_button,
        card_background,
      } = colors;

      const setShades = (base, prefix) => {
        if (!base) return;

        const values = {
          50: adjustColor(base, 48),
          100: adjustColor(base, 40),
          200: adjustColor(base, 30),
          300: adjustColor(base, 20),
          400: adjustColor(base, 10),
          500: base,
          600: adjustColor(base, -10),
          700: adjustColor(base, -20),
          800: adjustColor(base, -30),
          900: adjustColor(base, -40),
          950: adjustColor(base, -50),
        };

        Object.entries(values).forEach(([key, val]) => {
          root.style.setProperty(`--color-${prefix}-${key}`, val);
        });
      };

      if (primary_color) setShades(primary_color, "primary");
      if (secondary_color) setShades(secondary_color, "secondary");
      if (background_color)
        root.style.setProperty("--color-background-main", background_color);
      if (primary_text)
        root.style.setProperty("--color-primary-text", primary_text);
      if (secondary_text)
        root.style.setProperty("--color-secondary-text", secondary_text);
      if (primary_button)
        root.style.setProperty("--color-primary-button", primary_button);
      if (secondary_button)
        root.style.setProperty("--color-secondary-button", secondary_button);
      if (card_background)
        root.style.setProperty("--color-card-background", card_background);
    };

    const fetchAndSubscribe = async () => {
      try {
        console.log("Mengambil data warna dari database..."); // Debugging
        const { data, error } = await supabase
          .from("settings")
          .select(
            `
            primary_color,
            secondary_color,
            background_color,
            primary_text,
            secondary_text,
            primary_button,
            secondary_button,
            card_background
          `
          )
          .eq("id", "global")
          .single();

        if (error) {
          console.error("Error mengambil data:", error);
          return;
        }

        if (!data) {
          console.warn("Tidak ada data warna ditemukan");
          return;
        }

        console.log("Data warna diterima:", data); // Debugging
        applyColors(data);

        const channel = supabase
          .channel("theme-settings")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "settings",
              filter: "id=eq.global",
            },
            (payload) => {
              console.log("Perubahan diterima:", payload); // Debugging
              applyColors(payload.new);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (err) {
        console.error("Error dalam fetchAndSubscribe:", err);
      }
    };

    fetchAndSubscribe();
  }, []);

  return null;
}
