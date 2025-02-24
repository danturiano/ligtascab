"use server";
import { createClient } from "@/supabase/server";
import { cache } from "react";

export type Vehicle = {
  id?: string;
  operator_id?: string;
  plate_number: string;
  qr_code?: string | null;
  registration_expiry: Date;
  registration_number: string;
  status?: string;
};

export async function createVehicle(newVehicle: Vehicle) {
  const supabase = await createClient();
  const { error } = await supabase.from("vehicles").insert([newVehicle]);

  if (error) {
    console.error(error);
    return error;
  }
}

export async function deleteVehicle(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    console.error(error);
    return { error };
  }

  return { data, error };
}

export const isVehicleRegistered = async (
  plate_number: string,
  registration_number: string
) => {
  const vehicles = await getAllVehicle();
  const isRegistered = vehicles.some(
    (vehicle) =>
      vehicle.plate_number === plate_number ||
      vehicle.registration_number === registration_number
  );

  return isRegistered;
};

export const getPaginatedVehicles = async (from: number, to: number) => {
  const supabase = await createClient();
  const { data: vehicles, count } = await supabase
    .from("vehicles")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("status", { ascending: true });

  return { vehicles, count };
};

export const getAllVehicle = cache(async (): Promise<Vehicle[]> => {
  const supabase = await createClient();
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("status", { ascending: true });

  if (error) {
    console.error("Error fetching drivers:", error);
    return []; // Ensure the function never returns null
  }

  return vehicles ?? [];
});

export async function getVehicle(registration_number: string) {
  const supabase = await createClient();
  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select()
    .eq("registration_number", registration_number)
    .single();

  if (error) {
    console.error("Error fetching drivers:", error);
  }

  return { vehicle, error };
}
