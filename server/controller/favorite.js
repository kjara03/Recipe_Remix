import supabase from "../db/db.js";

// Create a favorite entry into the table
export async function createFavoriteEntry(userId, recipeId) {
  try {
    const favoriteEntry = await supabase
      .from("Favorite")
      .insert({ userid: userId, recipeid: recipeId });
    if (favoriteEntry.error) {
      return { status: false, data: favoriteEntry };
    }
    return { status: true, data: favoriteEntry };
  } catch (error) {
    return { status: false, data: error };
  }
}

// Remove the favorite entry based on id
export async function removeFavoriteEntryById(id) {
  try {
    const entry = await supabase.from("Favorite").delete().eq("id", id);
    if (entry.erorr) {
      return { status: false, data: entry };
    }
    return { status: true, data: entry };
  } catch (error) {
    return { status: false, data: error };
  }
}

// Retrieve favorite recipes of a user
export async function getFavoritesByUser(userId) {
  try {
    const favoriteEntries = await supabase
      .from("Favorite")
      .select()
      .eq("userid", userId);
    if (favoriteEntries.error) {
      return { status: false, data: favoriteEntries };
    }
    return { status: true, data: favoriteEntries };
  } catch (error) {
    return { status: false, data: error };
  }
}

// Retrieve number of counts a recipe was favorited by users
export async function getFavoriteCount(recipeId) {
  try {
    const entryCount = await supabase
      .from("Favorite")
      .select("*", { head: true, count: "exact" })
      .eq("recipeid", recipeId);
    if (entryCount.error) {
      return { status: false, data: entryCount };
    }
    return { status: true, data: entryCount };
  } catch (error) {
    return { status: false, data: error };
  }
}
