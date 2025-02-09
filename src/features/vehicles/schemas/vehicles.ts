import { z } from 'zod';

export const VehicleSchema = z.object({
	id: z.string().uuid().optional(),
	plate_number: z.string(),
	qr_code: z.string().optional(),
	registration_number: z.string(),
	registration_expiry: z.date(),
	status: z.string().optional(),
	operator_id: z.string().optional(),
});
