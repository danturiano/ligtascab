import { createClient } from "@/supabase/client";

type User = {
  created_at?: string;
  id?: string;
  password: string;
  phone_number: string;
};

export async function createUser(newUser: User) {
  const supabase = createClient();
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.log(error);
    throw new Error("User could not be created");
  }

  return { data, error };
}
