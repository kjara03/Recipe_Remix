import supabase from "../db/db.js";

// Create a user into the table
export const createUser = async ({ email, password, username }) => {
  try {
    const user = await supabase
      .from("User")
      .insert({ email: email, password: password, username: username });
    if (user.error) {
      return { status: false, data: user };
    }
    return { status: true, data: user };
  } catch (error) {
    return { status: false, data: error };
  }
};

// Select the user based on id
export const getUserById = async ({ id }) => {
  try {
    const user = await supabase.from("User").select("*").eq("id", id).single();
    if (user.error) {
      return { status: false, data: user };
    }
    return { status: true, data: user };
  } catch (error) {
    return { status: false, data: error };
  }
};

// Select the user based on the unique email
export const getUserByEmail = async ({ email }) => {
  try {
    const user = await supabase
      .from("User")
      .select("*")
      .eq("email", email)
      .single();
    if (user.error) {
      return { status: false, data: user };
    }
    return { status: true, data: user };
  } catch (error) {
    return { status: false, data: error };
  }
};
