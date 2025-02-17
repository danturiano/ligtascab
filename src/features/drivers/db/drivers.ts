import { cache } from "react";
import { Driver } from "../schemas/drivers";
import { createClient } from "@/supabase/client";

interface PaginationParams {
  from: number;
  to: number;
}

interface PaginatedResponse<T> {
  data: T[];
  count: number;
}

export const getPaginatedDrivers = async ({
  from,
  to,
}: PaginationParams): Promise<PaginatedResponse<Driver>> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  const { data, error, count } = await supabase
    .from("drivers")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("status", { ascending: true });

  if (error) throw error;

  return {
    data: data || [],
    count: count || 0,
  };
};

export const getAllDrivers = cache(async (): Promise<Driver[]> => {
  const supabase = createClient();
  const { data: vehicles, error } = await supabase.from("drivers").select("*");

  if (error) {
    console.error("Error fetching drivers:", error);
    return []; // Ensure the function never returns null
  }

  return vehicles ?? [];
});

export const createDriver = async (newDriver: Driver) => {
  const supabase = createClient();
  const { error } = await supabase.from("drivers").insert([newDriver]);

  if (error) {
    console.error("Error creating driver:", error);
    return false;
  }

  return true;
};

export const isDriverRegistered = async (license_number: string) => {
  const vehicles = await getAllDrivers();
  const isRegistered = vehicles.some(
    (driver) => driver.license_number === license_number,
  );

  return isRegistered;
};
