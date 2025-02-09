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
