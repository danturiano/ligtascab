'use server';

import { auth } from '@/lib/auth';
import { ApiResponse, checkLog, createLog } from '../db/logs';
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
		};

		const existingLog = await checkLog(newLog);
		if (existingLog.error || existingLog.data) {
			return {
				error: existingLog.error || 'Log already exists',
			};
		}

		const logResult = await createLog(newLog);
		if (logResult.error) {
			return { error: logResult.error };
		}

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
