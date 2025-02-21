import { z } from "zod";

export const DriverSchema = z.object({
  status: z.string().optional(),
  first_name: z.string(),
  id: z.string().uuid().optional(),
  last_name: z.string(),
  license_expiry: z.date(),
  license_number: z.string(),
  operator_id: z.string().optional(),
  phone_number: z.string(),
});

export type Driver = z.infer<typeof DriverSchema>;
