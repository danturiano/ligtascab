"use server";

import { signIn } from "@/lib/auth";
import { CredentialsSchema } from "./types";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

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

  try {
    const response = await signIn("credentials", {
      redirect: false,
      callback: "/",
      email: result.data.email,
      password: result.data.password,
    });

    if (response?.error) {
      throw new Error(response.error.message);
    }

    return { data: response };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
