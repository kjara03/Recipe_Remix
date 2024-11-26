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

// Check if an favorite entry exist in the table
export async function isFavoriteEntryPresent(userid, recipeid) {
  try {
    const isEntryInTable = await supabase
      .from("Favorite")
      .select("*")
      .eq("userid", userid)
      .eq("recipeid", recipeid);
    // If the query contain data then it means it is already in favorite table
    if (isEntryInTable.data.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return error;
  }
}

// Remove the favorite entry based on user id and recipe id
export async function removeFavoriteEntryById(userid, recipeid) {
  try {
    const entry = await supabase
      .from("Favorite")
      .delete()
      .eq("userid", userid)
      .eq("recipeid", recipeid);
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
      .select("recipeid")
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
