import { createClient } from "@/supabase/server";

type UserInformation = {
  first_name: string;
  last_name: string;
  email: string;
  subscribe_to_newsletter: boolean;
  image?: string;
};

type UserAddress = {
  street: string;
  barangay: string;
  city: string;
  postal_code: string;
};

type UserIsNew = {
  is_new_user: boolean;
};

export async function updateUser(
  userUpdate: UserInformation | UserAddress | UserIsNew
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const phone = user?.phone as string;

  const { data, error } = await supabase
    .from("operators")
    .update(userUpdate)
    .eq("phone", phone);

  if (error) {
    console.log(error);
    throw new Error("User could not be created");
  }

  const { error: errorUp } = await supabase.auth.updateUser({
    data: { ...userUpdate },
  });

  if (errorUp) {
    console.log(errorUp);
    throw new Error("User could not be updated");
  }

  return { data, error };
}
