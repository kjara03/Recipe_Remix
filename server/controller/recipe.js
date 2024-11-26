import supabase from "../db/db.js";

// Create a recipe into the table
export async function createRecipe(id, name, image) {
  try {
    const recipe = await supabase
      .from("Recipe")
      .insert({ id: id, name: name, image: image });
    return recipe;
  } catch (error) {
    return error;
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
    return recipe;
  } catch (error) {
    return error;
  }
}

// Select the recipe based on mutltiple ids
export async function getRecipeByIds(ids) {
  try {
    const recipes = await supabase.from("Recipe").select("*").in("id", ids);
    return recipes;
  } catch (error) {
    return error;
  }
}
