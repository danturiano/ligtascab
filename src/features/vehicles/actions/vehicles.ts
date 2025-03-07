"use server";

import { createClient } from "@/supabase/server";
import { createVehicle, isVehicleRegistered } from "../db/vehicles";
import { VehicleSchema } from "../schemas/vehicles";

export async function registerVehicle(Vehicle: unknown) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "User not authenticated" };

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
    result.data.registration_number
  );

  if (isRegistered) {
    return { error: "Vehicle is already registered." };
  }

  const newVehicle = {
    registration_expiry: result.data.registration_expiry,
    registration_number: result.data.registration_number,
    plate_number: result.data.plate_number,
    operator_id: user.id,
  };

  const error = await createVehicle(newVehicle);
  if (error) {
    return { error: "Cannot create a new vehicle." };
  }

  return { message: "Account created sucessfully" };
}
