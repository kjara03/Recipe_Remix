import supabase from "../db/db.js";

// Create a user into the table
export async function createUser(email, password, username) {
  try {
    const user = await supabase
      .from("User")
      .insert({ email: email, password: password, username: username });
    return { data: user };
  } catch (error) {
    return { data: error };
  }
}

// Select the user based on id
export async function getUserById(id) {
  try {
    const user = await supabase.from("User").select("*").eq("id", id).single();
    return { data: user };
  } catch (error) {
    return { data: error };
  }
}

// Select the user based on the unique email
export async function getUserByEmail(email) {
  try {
    const user = await supabase
      .from("User")
      .select("*")
      .eq("email", email)
      .single();
    return { data: user };
  } catch (error) {
    return { data: error };
  }
}
