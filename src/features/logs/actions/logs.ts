"use server";

import {
  checkDriverStatus,
  createLog,
  getDriverPlateNumber,
  updateDriverStatus,
  updateVehicleStatus,
} from "../db/logs";
import { LogSchema } from "../schemas/logs";

export async function createNewLog(DriverLog: unknown) {
  try {
    const result = LogSchema.safeParse(DriverLog);

    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      return {
        error: errorMessage,
      };
    }

    const log = {
      operator_id: result.data.driver.operator_id,
      driver_id: result.data.driver.id as string,
      plate_number: result.data.plate_number,
      driver_name: result.data.driver_name,
      log_type: result.data.log_type,
    };

    const status = `${result.data.log_type === "Time-in" ? "active" : "inactive"}`;

    console.log(log);

    if (log.log_type === "Time-out") {
      const isActive = await checkDriverStatus(log.driver_id);
      if (!isActive) {
        return { error: "Driver is not active." };
      }
      const plate_number = await getDriverPlateNumber(log.driver_id);
      if (plate_number) {
        log.plate_number = plate_number;
      }
      const isCreated = await createLog(log);
      if (!isCreated) {
        return { error: "Log was not created" };
      }
    }

    if (log.log_type === "Time-in") {
      const isActive = await checkDriverStatus(log.driver_id);
      if (isActive) {
        return { error: "Driver is currently active." };
      }
      const isCreated = await createLog(log);
      if (!isCreated) {
        return { error: "Log was not created" };
      }
    }

    const isDriverUpdated = await updateDriverStatus(log.driver_id, status);
    if (!isDriverUpdated) {
      return { message: "Cannot update driver status." };
    }
    const isVehicleUpdated = await updateVehicleStatus(
      log.plate_number,
      status
    );
    if (!isVehicleUpdated) {
      return { message: "Cannot update vehicle status." };
    }

    return {
      message: "Success!",
    };
  } catch (error) {
    console.error("Error creating new log:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to create log",
    };
  }
}
