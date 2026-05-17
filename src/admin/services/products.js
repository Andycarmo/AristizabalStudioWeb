import { supabase } from "../../config/supabase";

export const getProducts = () =>
  supabase.from("products").select("*");

export const createProduct = (product) =>
  supabase.from("products").insert([product]);

export const updateProduct = (id, product) =>
  supabase.from("products").update(product).eq("id", id);

export const deleteProduct = (id) =>
  supabase.from("products").delete().eq("id", id);