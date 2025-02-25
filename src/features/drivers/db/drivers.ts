"use server";

import { createClient } from "@/supabase/server";
import { cache } from "react";
import { Driver } from "../schemas/drivers";

export const createDriver = async (newDriver: Driver) => {
  const supabase = await createClient();
  const { error } = await supabase.from("drivers").insert([newDriver]);

  if (error) {
    console.error("Error creating driver:", error);
    return false;
  }

  return true;
};

export async function deleteDriver(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("drivers").delete().eq("id", id);

  if (error) {
    console.error(error);
    return { error };
  }

  return { data, error };
}

export const isDriverRegistered = async (license_number: string) => {
  const { drivers } = await getAllDrivers();
  if (!drivers) {
    return [];
  }
  const isRegistered = drivers.some(
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

export const getAllDrivers = cache(async () => {
  const supabase = await createClient();
  const { data: drivers } = await supabase
    .from("drivers")
    .select("*")
    .order("status", { ascending: true });

  return { drivers };
});
