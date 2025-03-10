"use server";

import { createClient } from "@/supabase/server";
import { Driver, DriverType } from "@/types/types";
import { cache } from "react";

export const getDriver = async (id: string): Promise<DriverType | null> => {
  const supabase = await createClient();
  const { data: driver, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching driver:", error);
    return null;
  }

  return driver;
};

export const createDriver = async (newDriver: Driver): Promise<boolean> => {
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

export const isDriverRegistered = async (
  license_number: string
): Promise<boolean> => {
  const drivers = await getAllDrivers();
  if (!drivers) {
    return false;
  }
  const isRegistered = drivers.some(
    (driver) => driver.license_number === license_number
  );

  return isRegistered;
};

export const getAllDrivers = cache(async (): Promise<Driver[]> => {
  const supabase = await createClient();
  const { data: drivers, error } = await supabase
    .from("drivers")
    .select("*")
    .order("status", { ascending: true });

  if (error) {
    throw new Error("Error fetching drivers", error);
  }

  return drivers || [];
});
