'use server';

import { auth } from '@/lib/auth';
import { formatDate } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { createVehicle, getAllVehicle } from '../db/vehicles';
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

	const isRegistered = await isVehicleRegistered(
		result.data.plate_number,
		result.data.registration_number
	);

	if (isRegistered) {
		return { error: 'Vehicle is already registered.' };
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
		revalidatePath('/dashboard/manage-vehicle');
		return { message: 'Account created sucessfully' };
	}
}

export async function isVehicleRegistered(
	plate_number: string,
	registration_number: string
) {
	const vehicles = await getAllVehicle();
	const isRegistered = vehicles.some(
		(vehicle) =>
			vehicle.plate_number === plate_number ||
			vehicle.registration_number === registration_number
	);

	return isRegistered;
}
