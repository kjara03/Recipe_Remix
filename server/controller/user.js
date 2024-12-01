import supabase from "../db/db.js";

// Create a user into the table
export async function createUser(email, password, username) {
  try {
    const user = await supabase
      .from("User")
      .insert({ email: email, password: password, username: username });
    return user;
  } catch (error) {
    return error;
  }
}

// Select the user based on id
export async function getUserById(id) {
  try {
    const user = await supabase.from("User").select("*").eq("id", id).single();
    return user;
  } catch (error) {
    return error;
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
    return user;
  } catch (error) {
    return error;
  }
}

//Update user password
export async function updatePassword(email, password) {
  try {
    const user = await supabase.from("User").select("*").eq("email", email).single();
    const { error } = await supabase
      .from("User")
      .update({password: password })
      .eq("email", email);
  } catch (error) {
    return error;
  }
}