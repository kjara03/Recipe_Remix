import supabase from "../db/db.js";

// Create a recipe into the table
export const createRecipe = async ({ id, name, image }) => {
  try {
    const recipe = await supabase.from("Recipe").insert([{ id, name, image }]);
    console.log(recipe);
    return { status: true, data: recipe };
  } catch (error) {
    return { status: false, data: error };
  }
};

// Select the recipe based on id
export const getRecipeById = async ({ id }) => {
  try {
    const recipe = await supabase
      .from("Recipe")
      .select("*")
      .eq("id", id)
      .single();
    if (recipe.error) {
      return { status: false, data: recipe };
    }
    return { status: true, data: recipe };
  } catch (error) {
    return { status: false, data: error };
  }
};
