"use server";

import { createClient } from "@/supabase/server";
import { CredentialsSchema, UserSchema } from "../schemas/authentication";

export async function signInWithCredentials(User: unknown) {
  const result = CredentialsSchema.safeParse(User);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    phone: result.data.phone_number,
    password: result.data.password,
  });

  if (error) {
    console.error(error);
    return { error: error };
  }

  return { message: "Login" };
}

export async function register(User: unknown) {
  const result = UserSchema.safeParse(User);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const supabase = await createClient();

  const { error: signUpError } = await supabase.auth.signUp({
    phone: result.data.phone_number,
    password: result.data.password,
    options: {
      data: {
        is_new_user: true,
      },
    },
  });
  if (signUpError) {
    console.log(signUpError);
    return { error: signUpError.message };
  }

  return { message: "Account created sucessfully" };
}
