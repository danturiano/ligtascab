"use server";

import { formatDate } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { createDriver, isDriverRegistered } from "../db/drivers";
import { DriverSchema } from "../schemas/drivers";

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
};

export async function registerDriver(Driver: unknown) {
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) {
      return {
        error: "User not authenticated",
      };
    }

    const result = DriverSchema.safeParse(Driver);

    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      return {
        error: errorMessage,
      };
    }

    if (!result.data.license_expiry) return null;
    const date = result.data.license_expiry.toString();
    const expiryDate = new Date(formatDate(date));

    const newDriver = {
      license_expiry: expiryDate,
      license_number: result.data.license_number,
      first_name: result.data.first_name,
      last_name: result.data.last_name,
      phone_number: result.data.phone_number,
      operator_id: user.id,
    };

    console.log(newDriver);

    const isRegistered = await isDriverRegistered(result.data.license_number);
    if (isRegistered) {
      return { error: "Driver is already registered" };
    }

    const isCreated = await createDriver(newDriver);
    if (!isCreated) {
      return { error: "Unable to create new driver." };
    }

    return { message: "Driver created successfully!" };
  } catch (error) {
    console.error("Error creating new log:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to create log",
    };
  }
}
