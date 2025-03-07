import { DriverSchema } from "@/types/types";
import { z } from "zod";

export const LogSchema = z.object({
  driver: DriverSchema,
  plate_number: z.string(),
  driver_name: z.string(),
  log_type: z.string(),
});

export type Log = {
  created_at?: string;
  driver_id: string;
  driver_name: string;
  operator_id: string | undefined;
  type?: string;
  id?: string;
  plate_number?: string;
};
