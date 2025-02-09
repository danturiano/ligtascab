import supabase from '@/lib/supabase';
import { Driver, Log } from '../schemas/logs';

export type ApiResponse<T> = {
	data?: T;
	error?: string;
	message?: string;
};

export async function getDriver(id: string): Promise<Driver> {
	console.log(id);
	const { data: driver, error } = await supabase
		.from('drivers')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		return {
			status: '',
			first_name: '',
			id: '',
			last_name: '',
			license_expiry: '',
			license_number: '',
			operator_id: '',
			phone_number: '',
		};
	}

	return driver;
}

export async function getAvailableVehicle(): Promise<string[]> {
	const { data: vehicles, error } = await supabase
		.from('vehicles')
		.select('plate_number')
		.eq('status', 'inactive');

	if (error) {
		console.error('Error fetching drivers:', error);
		return []; // Ensure the function never returns null
	}

	return vehicles?.map((vehicle) => vehicle.plate_number) ?? [];
}

export async function checkLog(newLog: Log): Promise<ApiResponse<any>> {
	const { data, error } = await supabase
		.from('driver_logs')
		.select('driver_id')
		.eq('driver_id', newLog.driver_id);

	if (error) {
		return { error: error.message };
	}

	if (data) {
		return { error: 'Driver is currently active' };
	}

	return { data };
}

export async function createLog(newLog: Log): Promise<ApiResponse<Log>> {
	const { data, error } = await supabase
		.from('driver_logs')
		.insert([newLog])
		.select()
		.single();

	if (error) {
		console.error('Error inserting log:', error);
		return { error: error.message };
	}

	return {
		data: data as Log,
		message: 'Log created successfully',
	};
}
