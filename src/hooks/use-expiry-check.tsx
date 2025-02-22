"use client";
import { useState, useEffect } from "react";
import { Driver } from "@/features/drivers/schemas/drivers";
import { Vehicle } from "@/features/vehicles/db/vehicles";
import { isExpiringWithinMonth } from "@/lib/utils";
import { createClient } from "@/supabase/client";

export const useExpiryCheck = () => {
  const [expiringItems, setExpiringItems] = useState<{
    drivers: Driver[];
    vehicles: Vehicle[];
  }>({ drivers: [], vehicles: [] });

  useEffect(() => {
    const checkExpiries = async () => {
      const supabase = createClient();
      // Fetch drivers
      const { data: drivers } = await supabase.from("drivers").select("*");
      // Fetch vehicles
      const { data: vehicles } = await supabase.from("vehicles").select("*");

      console.log(drivers, vehicles);

      const expiringDrivers =
        drivers?.filter((driver) =>
          isExpiringWithinMonth(driver.license_expiry)
        ) || [];

      const expiringVehicles =
        vehicles?.filter((vehicle) =>
          isExpiringWithinMonth(vehicle.registration_expiry)
        ) || [];

      console.log(expiringDrivers, expiringVehicles);

      setExpiringItems({
        drivers: expiringDrivers,
        vehicles: expiringVehicles,
      });
    };

    // Check initially
    checkExpiries();

    // Set up interval to check daily
    // const interval = setInterval(checkExpiries, 24 * 60 * 60 * 1000);
    // return () => clearInterval(interval);
  }, [expiringItems]);

  return expiringItems;
};
