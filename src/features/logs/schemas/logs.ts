import { DriverSchema } from '@/features/drivers/schemas/drivers';
import { z } from 'zod';

export const LogSchema = z.object({
	driver: DriverSchema,
	plate_number: z.string(),
	driver_name: z.string(),
	log_type: z.string(),
});

// export const NewLogSchema = z.object({
// 	operator_id: z.string().uuid(),
// 	driver_id: z.string().uuid(),
// 	plate_number: z.string(),
// 	driver_name: z.string(),
// 	created_at: z.string().optional(),
// 	id: z.string().optional(),
// });

export type Log = {
	created_at?: string;
	driver_id: string;
	driver_name: string;
	type?: string;
	id?: string;
	plate_number?: string;
};

export type Driver = z.infer<typeof DriverSchema>;
