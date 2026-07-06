import { supabase } from "../config/supabase";
// =============================
// GET SECTION
// =============================
export async function getSection(section) {
  const { data, error } = await supabase
    .from("website_content")
    .select("*")
    .eq("section", section);
  if (error) throw error;
  const result = {};
  data.forEach(item => {
    result[item.key] = item.value;
  });
  return result;
}
// =============================
// UPDATE SECTION
// =============================
export async function updateSection(section, values) {
  const updates = Object.entries(values).map(
    ([key, value]) => ({
      section,
      key,
      value,
    })
  );
  const { data, error } = await supabase
    .from("website_content")
    .upsert(updates, {
      onConflict: "section,key",
    });
  if (error)
    throw error;
    return data;
}