import { createClient } from "@/utils/supabase/client";

export async function getThemeColors() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("settings")
    .select("primary_color, secondary_color, background_color, primary_text, secondary_text, primary_button, secondary_button, card_background")
    .eq("id", "global")
    .single();

  if (error || !data) {
    console.error("Gagal mengambil warna:", error?.message);
    return {
      primary: "blue",
      secondary: "cyan",
      background: "white",
      primary_text: "white",
      secondary_text: "white",
      primary_button: "white",
      secondary_button: "white",
      card_background: "white"
    };
  }

  return {
    primary: data.primary_color || "blue",
    secondary: data.secondary_color || "cyan",
    background: data.background_color || "white",
    primary_text: data.primary_text || "cyan",
    secondary_text: data.secondary_text || "white",
    primary_button: data.primary_button || "cyan",
    secondary_button: data.secondary_button || "white",
    card_background: data.card_background || "white",
  };
}
