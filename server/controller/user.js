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

// Update the password for the user based on the email
export async function updatePassword(userid, password) {
  try {
    const user = await supabase
      .from("User")
      .update({password: password })
      .eq("id", userid)   
      //.limit(1);
      //.single();
    return user;
  } catch (error) {
    return error;
  }
}

