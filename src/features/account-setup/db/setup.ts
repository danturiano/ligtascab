import { createClient } from "@/supabase/client";

type UserUpdate = {
  first_name: string;
  last_name: string;
  email: string;
  subscribe_newsletter: boolean;
  isNewUser: boolean;
  image?: string;
};

export async function updateUser(userr: UserUpdate) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const phone_number = user?.phone as string;

  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("phone_number", phone_number);

  if (error) {
    console.log(error);
    throw new Error("User could not be created");
  }

  return { data, error };
}
