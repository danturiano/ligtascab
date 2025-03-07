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
  image: z.string().nullable().optional(),
});

export type Driver = z.infer<typeof DriverSchema>;

export type Expiry = {
  id: number;
  source_table: string;
  source_id: string;
  expiry_date: Date;
  mark_as_read: boolean;
  plate_number?: string;
  full_name?: null;
};

export type Vehicle = {
  id?: string;
  operator_id?: string;
  plate_number: string;
  qr_code?: string | null;
  registration_expiry: Date;
  registration_number: string;
  status?: string;
};
