import { supabase } from "../../../utilities/supabaseClient";

export const getAllKomunitasAktivitas = async () => {
  const komunitas = await supabase
    .from("KomunitasAktivitas")
    .select("*")
    .eq("type_id", 2);

  const aktivitas = await supabase
    .from("KomunitasAktivitas")
    .select("*")
    .eq("type_id", 3);

  return { komunitas, aktivitas };
};

export const getKomunitasAktivitasById = async (id: string) => {
  const data = await supabase
    .from("KomunitasAktivitas")
    .select("*")
    .eq("id", id)
    .single();

  return data;
};

export const getKomunitasAktivitasByCategory = async (category: string) => {
  const data = await supabase
    .from("KomunitasAktivitas")
    .select("*")
    .eq("category", category);

  return data;
};

export const getAllKomunitasAktivitasCategories = async () => {
  const komunitas = await supabase
    .from("Category")
    .select("*")
    .eq("category_type", 2)
    .order("id", { ascending: true });

  const aktivitas = await supabase
    .from("Category")
    .select("*")
    .eq("category_type", 3)
    .order("id", { ascending: true });

  return { komunitas, aktivitas };
};
