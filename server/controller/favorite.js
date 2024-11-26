import supabase from "../db/db.js";

// Create a favorite entry into the table
export async function createFavoriteEntry(userid, recipeid) {
  try {
    const favoriteEntry = await supabase
      .from("Favorite")
      .insert({ userid: userid, recipeid: recipeid });
    return favoriteEntry;
  } catch (error) {
    return error;
  }
}

// Remove the favorite entry based on id
export async function removeFavoriteEntryById(id) {
  try {
    const entry = await supabase.from("Favorite").delete().eq("id", id);
    return entry;
  } catch (error) {
    return error;
  }
}

// Retrieve favorite recipes of a user
export async function getFavoritesByUser(userid) {
  try {
    const favoriteEntries = await supabase
      .from("Favorite")
      .select()
      .eq("userid", userid);
    return favoriteEntries;
  } catch (error) {
    return error;
  }
}

// Retrieve number of counts a recipe was favorited by users
export async function getFavoriteCount(recipeid) {
  try {
    const entryCount = await supabase
      .from("Favorite")
      .select("*", { head: true, count: "exact" })
      .eq("recipeid", recipeid);
    return entryCount;
  } catch (error) {
    return error;
  }
}
