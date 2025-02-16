import supabase from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export type Vehicle = {
  id?: string;
  operator_id?: string;
  plate_number: string;
  qr_code?: string | null;
  registration_expiry: string;
  registration_number: string;
  status?: string;
};

export const isVehicleRegistered = async ( plate_number: string,
  registration_number: string) => {
    const vehicles = await getAllVehicle();
    const isRegistered = vehicles.some(
      (vehicle) =>
        vehicle.plate_number === plate_number ||
        vehicle.registration_number === registration_number,
    );

    return isRegistered;
}

export const getAllVehicle = cache(async (): Promise<Vehicle[]> => {
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

export async function getVehicle(
  registration_number: string,
): Promise<Vehicle> {
  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select()
    .eq("registration_number", registration_number)
    .single();

  if (error) {
    console.error("Error fetching drivers:", error);
  }

  return vehicle;
}

export async function createVehicle(newVehicle: Vehicle) {
  const { data, error } = await supabase.from("vehicles").insert([newVehicle]);

  if (error) {
    console.log(error);
    throw new Error("cannot add vehicle");
  }

  return { data, error };
}

export async function deleteVehicle(id: string) {
  const { error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("cannot delete vehicle");
  }

  revalidatePath("/dashboard/vehicles");

  return { error };
}

interface PaginationParams {
  from: number;
  to: number;
}

interface PaginatedResponse<T> {
  data: T[];
  count: number;
}

export const getPaginatedVehicles = cache(
  async ({
    from,
    to,
  }: PaginationParams): Promise<PaginatedResponse<Vehicle>> => {
    const { data, error, count } = await supabase
      .from("vehicles")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("status", { ascending: true });

    if (error) throw error;

    return {
      data: data || [],
      count: count || 0,
    };
  },
);
