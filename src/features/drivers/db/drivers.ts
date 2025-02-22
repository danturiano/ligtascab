"use server";

import { createClient } from "@/supabase/server";
import { Driver } from "../schemas/drivers";
import { cache } from "react";

export const createDriver = async (newDriver: Driver) => {
  const supabase = await createClient();
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
    (driver) => driver.license_number === license_number
  );

  return isRegistered;
};

export const getPaginatedDrivers = async (from: number, to: number) => {
  const supabase = await createClient();
  const { data: drivers, count } = await supabase
    .from("drivers")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("status", { ascending: true });

  return { drivers, count };
};

export const getAllDrivers = cache(async (): Promise<Driver[]> => {
  const supabase = await createClient();
  const { data: vehicles, error } = await supabase.from("drivers").select("*");

  if (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }

  return vehicles ?? [];
});
