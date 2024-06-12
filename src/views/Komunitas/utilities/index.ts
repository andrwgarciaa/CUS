import { supabase } from "../../../utilities/supabaseClient";

export const getAllCommunityActivity = async () => {
  const komunitas = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("type_id", 2);

  const aktivitas = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("type_id", 3);

  return { komunitas, aktivitas };
};

export const getCommunityActivityById = async (id: string | undefined) => {
  const data = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("id", id)
    .single();

  return data;
};

export const getCommunityActivityByCategory = async (category: string) => {
  const data = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("category", category);

  return data;
};

export const getAllCommunityActivityCategories = async () => {
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

export const getCommunityActivityCategoryById = async (
  id: string | undefined
) => {
  const data = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("id", id)
    .single();

  const category = await supabase
    .from("Category")
    .select("*")
    .eq("id", data.data.category_id)
    .single();

  return category;
};
