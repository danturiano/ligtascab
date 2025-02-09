'use server';

import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { createLog } from '../db/logs';
import { LogSchema } from '../schemas/logs';

export async function createNewLog(DriverLog: unknown) {
	const result = LogSchema.safeParse(DriverLog);

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

	const newLog = {
		id: session?.user.id as string,
		driver_id: result.data.driver.id,
		plate_number: result.data.plate_number,
		driver_name: result.data.driver_name,
	};

	await createLog(newLog);

	if (result.success) {
		revalidatePath('/dashboard/driver-log');
		return { message: 'Account created sucessfully' };
	}
}
