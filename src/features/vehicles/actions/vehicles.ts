"use server";

import { formatDate } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { createVehicle, isVehicleRegistered } from "../db/vehicles";
import { VehicleSchema } from "../schemas/vehicles";
import { createClient } from "@/supabase/server";

export async function registerVehicle(Vehicle: unknown) {
  const result = VehicleSchema.safeParse(Vehicle);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const isRegistered = await isVehicleRegistered(
    result.data.plate_number,
    result.data.registration_number,
  );

  if (isRegistered) {
    return { error: "Vehicle is already registered." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const date = result.data.registration_expiry.toString();
  const expiryDate = formatDate(date);

  const newVehicle = {
    registration_expiry: expiryDate,
    registration_number: result.data.registration_number,
    plate_number: result.data.plate_number,
    operator_id: user.id,
  };

  await createVehicle(newVehicle);

  if (result.success) {
    revalidatePath("/dashboard/vehicles");
    return { message: "Account created sucessfully" };
  }
}
