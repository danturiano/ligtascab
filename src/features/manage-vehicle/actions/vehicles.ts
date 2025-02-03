'use server';

import { auth } from '@/lib/auth';
import { formatDate } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { createVehicle } from '../db/vehicles';
import { VehicleSchema } from '../schemas/vehicles';

export async function registerVehicle(Vehicle: unknown) {
	const result = VehicleSchema.safeParse(Vehicle);

	if (!result.success) {
		let errorMessage = '';

		result.error.issues.forEach((issue) => {
			errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
		});

		return {
			error: errorMessage,
		};
	}

	const session = await auth();

	const date = result.data.registration_expiry.toString();
	const expiryDate = formatDate(date);

	const newVehicle = {
		registration_expiry: expiryDate,
		registration_number: result.data.registration_number,
		plate_number: result.data.plate_number,
		operator_id: session?.user.id,
	};

	await createVehicle(newVehicle);

	if (result.success) {
		return { message: 'Account created sucessfully' };
	}

	revalidatePath('/dashboard/manage-vehicle');
}
