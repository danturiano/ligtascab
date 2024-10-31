"use server";

import { createUser, getUser } from "@/services/data-service";
import { saltAndHashPassword } from "@/utils/password";
import { UserSchema } from "./_lib/types";

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
