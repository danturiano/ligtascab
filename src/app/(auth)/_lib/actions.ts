"use server";

import { signIn } from "@/lib/auth";
import { CredentialsSchema } from "./types";
import { redirect } from "next/navigation";

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
    await signIn("credentials", {
      redirect: false,
      callback: "/",
      email: result.data.email,
      password: result.data.password,
    });
  } catch (error) {
    console.log(error);
    return error;
  }

  redirect("/dashboard");
}
