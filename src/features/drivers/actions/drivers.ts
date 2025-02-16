"use server";

import { auth } from "@/lib/auth";
import { DriverSchema } from "../schemas/drivers";
import { formatDate } from "@/lib/utils";
import { createDriver, isDriverRegistered } from "../db/drivers";
import { revalidatePath } from "next/cache";

export async function registerDriver(Driver: unknown) {
  try {
    const session = await auth();
    if (!session?.user.id) {
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
    const expiryDate = formatDate(date);

    const newDriver = {
      license_expiry: expiryDate,
      license_number: result.data.license_number,
      first_name: result.data.first_name,
      last_name: result.data.last_name,
      phone_number: result.data.phone_number,
      operator_id: session?.user.id,
    };

    const isRegistered = await isDriverRegistered(result.data.license_number);
    if (isRegistered) {
      return { error: "Driver is already registered" };
    }

    const isCreated = await createDriver(newDriver);
    if (!isCreated) {
      return { error: "Unable to create new driver." };
    }

    revalidatePath("/dashboard/drivers", "page");

    return { message: "Driver created successfully!" };
  } catch (error) {
    console.error("Error creating new log:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to create log",
    };
  }
}
