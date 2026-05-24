import { supabase } from "../config/supabase";

// ================= GET PRODUCTS =================
export const getProducts = () =>
  supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

// ================= CREATE PRODUCT =================
export const createProduct = (product) =>
  supabase
.from("products")
.insert([product])

// ================= UPDATE PRODUCT =================
export const updateProduct = (id, product) =>
  supabase
    .from("products")
    .update(product)
    .eq("id", id)

// ================= DELETE PRODUCT =================
export const deleteProduct = (id) =>
  supabase
    .from("products")
    .delete()
    .eq("id", id);

// ================= ARTWORKDETAIL PRODUCT =================
export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}