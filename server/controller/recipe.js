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

// Check if a recipe exist in the table
export async function isRecipeEntryPresent(id) {
  try {
    const isEntryInTable = await supabase
      .from("Recipe")
      .select("*")
      .eq("id", id);
    // If the query contain data then it means it is already in entry table
    if (isEntryInTable.data.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return error;
  }
}
