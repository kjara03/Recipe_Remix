import supabase from "../db/db.js";

// Create a recipe into the table
export async function createRecipe(id, name, image) {
  try {
    const recipe = await supabase
      .from("Recipe")
      .insert({ id: id, name: name, image: image });
    return { data: recipe };
  } catch (error) {
    return { data: error };
  }
}

// Select the recipe based on id
export async function getRecipeById(id) {
  try {
    const recipe = await supabase
      .from("Recipe")
      .select("*")
      .eq("id", id)
      .single();
    return { data: recipe };
  } catch (error) {
    return { data: error };
  }
}
