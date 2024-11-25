import supabase from "@/lib/supabase";

type newUser = {
  created_at?: string;
  email: string | null;
  fullName: string | undefined;
  id?: string;
  image?: string | undefined;
  password?: string | null;
};

export async function createUser(newUser: newUser) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.log(error);
    throw new Error("User could not be created");
  }

  return { data, error };
}

export async function getUser(email: string, password?: string) {
  let query = supabase.from("users").select("*").eq("email", email);

  if (password) {
    query = query.eq("password", password);
  }

  const { data, error } = await query.single();

  if (error) {
    console.log(error);
  }

  return data;
}
