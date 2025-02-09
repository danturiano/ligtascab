import { DriverSchema } from '@/features/drivers/schemas/drivers';
import { z } from 'zod';

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
