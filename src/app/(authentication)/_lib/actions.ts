"use server";

import { signIn } from "@/app/(authentication)/_lib/auth";
import { saltAndHashPassword } from "@/lib/utils";
import { createUser, getUser } from "@/services/data-service";
import { CredentialsSchema, UserSchema } from "./types";

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

  const user = await getUser(result.data.email);

  if (user) {
    return {
      error: "User already exists",
    };
  }

  if (result.data.password !== result.data.confirm_password) {
    return {
      error: "Password does not match",
    };
  }

  const pwHash = saltAndHashPassword(result.data.password);

  const newUser = {
    email: result.data.email,
    fullName: result.data.fullName,
    password: pwHash,
  };

  await createUser(newUser);

  if (result.success) {
    return { message: "Account created sucessfully" };
  }
}
