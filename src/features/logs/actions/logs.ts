'use server';

import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import {
	ApiResponse,
	checkLog,
	createLog,
	getDriverPlateNumber,
	updateDriverStatus,
	updateVehicleStatus,
} from '../db/logs';
import { Log, LogSchema } from '../schemas/logs';

export async function createNewLog(
	DriverLog: unknown,
): Promise<ApiResponse<Log>> {
	try {
		const result = LogSchema.safeParse(DriverLog);

		if (!result.success) {
			let errorMessage = '';

			result.error.issues.forEach((issue) => {
				errorMessage =
					errorMessage + issue.path[0] + ': ' + issue.message + '. ';
			});

			return {
				error: errorMessage,
			};
		}

		const session = await auth();
		if (!session?.user.id) {
			return {
				error: 'User not authenticated',
			};
		}

		const newLog = {
			operator_id: session?.user.id as string,
			driver_id: result.data.driver.id,
			plate_number: result.data.plate_number,
			driver_name: result.data.driver_name,
			log_type: result.data.log_type,
		};

		const status = `${result.data.log_type === 'Time-in' ? 'active' : 'inactive'}`;

		if (status === 'active') {
			const existingLog = await checkLog(newLog);
			if (existingLog.error || existingLog.data) {
				return {
					error: existingLog.error || 'Log already exists',
				};
			}
			newLog.log_type = 'Time-in';
		}

		if (status === 'inactive') {
			const driverPlateNumber = await getDriverPlateNumber(
				result.data.driver.id,
			);
			newLog.plate_number = driverPlateNumber;
		}

		const logResult = await createLog(newLog);
		if (logResult.error) {
			return { error: logResult.error };
		}

		const setVehicleStatus = await updateVehicleStatus(
			result.data.plate_number,
			status,
		);
		if (setVehicleStatus?.error) {
			return {
				error: setVehicleStatus.error || 'Cannot update vehicle status',
			};
		}

		const setDriverStatus = await updateDriverStatus(
			result.data.driver.id,
			status,
		);
		if (setDriverStatus?.error) {
			return {
				error: setDriverStatus.error || 'Cannot update driverr status',
			};
		}

		revalidatePath('/dashboard/driver-logs', 'page');

		return {
			data: logResult.data,
			message: 'Log created successfully',
		};
	} catch (error) {
		console.error('Error creating new log:', error);
		return {
			error: error instanceof Error ? error.message : 'Failed to create log',
		};
	}
}
