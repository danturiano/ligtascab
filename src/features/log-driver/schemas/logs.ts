import { z } from 'zod';

export const DriverSchema = z.object({
	first_name: z.string(),
	id: z.string().uuid(),
	last_name: z.string(),
	license_expiry: z.string(),
	license_number: z.string(),
	operator_id: z.string(),
	phone_number: z.string(),
});

export const LogSchema = z.object({
	driver: DriverSchema,
	plate_number: z.string(),
	driver_name: z.string(),
});

export const NewLogSchema = z.object({
	id: z.string().uuid(),
	driver_id: z.string().uuid(),
	plate_number: z.string(),
	driver_name: z.string(),
});

export type Log = z.infer<typeof NewLogSchema>;
export type Driver = z.infer<typeof DriverSchema>;
