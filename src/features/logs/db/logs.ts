"use server";

import { Driver } from "@/features/drivers/schemas/drivers";
import { createClient } from "@/supabase/server";
import { cache } from "react";
import { Log } from "../schemas/logs";

export const getDriver = async (id: string): Promise<Driver> => {
  const supabase = await createClient();
  const { data: driver, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return {
      status: "",
      first_name: "",
      id: "",
      last_name: "",
      license_expiry: new Date(0),
      license_number: "",
      operator_id: "",
      phone_number: "",
    };
  }

  return driver;
};

export const getDriverPlateNumber = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("driver_logs")
    .select("plate_number")
    .eq("driver_id", id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching driver plate number:", error);
    return { error: error.message };
  }

  return data[0].plate_number;
};

export const getAvailableVehicle = cache(async (): Promise<string[]> => {
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
});

export const getAllLogs = cache(async (): Promise<Log[]> => {
  const supabase = await createClient();
  const { data: logs, error } = await supabase
    .from("driver_logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return logs ?? [];
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

export const getPaginatedLogs = async (from: number, to: number) => {
  const supabase = await createClient();
  const { data: logs, count } = await supabase
    .from("driver_logs")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("created_at", { ascending: false });

  return { logs, count };
};

export const updateVehicleStatus = async (
  plate_number: string,
  status: string
) => {
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
