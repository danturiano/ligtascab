"use server";

import { createClient } from "@/supabase/server";
import { cache } from "react";
import { Log } from "../schemas/logs";
import { Driver, Vehicle } from "@/types/types";

export const getDriver = async (id: string): Promise<Driver | null> => {
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

export const getDriverPlateNumber = async (
  id: string
): Promise<string | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("driver_logs")
    .select("plate_number")
    .eq("driver_id", id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching driver plate number:", error);
    return null;
  }

  return data[0].plate_number;
};

export const getAvailableVehicle = cache(
  async (): Promise<Vehicle["plate_number"][]> => {
    const supabase = await createClient();
    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select("plate_number")
      .eq("status", "inactive");

    if (error) {
      console.error("Error fetching vehicles:", error);
      return [];
    }

    return vehicles?.map((vehicle) => vehicle.plate_number) ?? [];
  }
);

export const getAllLogs = cache(async (): Promise<Log[]> => {
  const supabase = await createClient();
  const { data: logs, error } = await supabase
    .from("driver_logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Error fetching logs", error);
  }

  return logs || [];
});

export const checkDriverStatus = async (id: string): Promise<boolean> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("drivers")
    .select("status")
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (error) {
    return false;
  }

  return true;
};

export const updateVehicleStatus = async (
  plate_number: string,
  status: string
): Promise<boolean> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("vehicles")
    .update({ status: status })
    .eq("plate_number", plate_number)
    .select();

  if (error) {
    console.error("Error updating driver status:", error);
    return false;
  }

  return true;
};

export const updateDriverStatus = async (
  id: string,
  status: string
): Promise<boolean> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("drivers")
    .update({ status: status })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating driver status:", error);
    return false;
  }

  return true;
};

export const createLog = async (newLog: Log): Promise<boolean> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("driver_logs")
    .insert([newLog])
    .select()
    .single();

  if (error) {
    console.error("Error inserting log:", error);
    return false;
  }

  return true;
};
