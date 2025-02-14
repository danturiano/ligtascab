import { auth } from "@/lib/auth";
import supabase from "@/lib/supabase";

type UserUpdate = {
  first_name: string;
  last_name: string;
  email: string;
  subscribe_newsletter: boolean;
  isNewUser: boolean;
  image?: string;
};

export async function updateUser(user: UserUpdate) {
  const session = await auth();

  const phone_number = session?.user.phone_number as string;

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
