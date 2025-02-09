import supabase from '@/lib/supabase';
import { Driver, Log } from '../schemas/logs';

export async function getAllDrivers(): Promise<Driver[]> {
	const { data: drivers, error } = await supabase.from('drivers').select('*');

	if (error) {
		console.error('Error fetching drivers:', error);
		return []; // Ensure the function never returns null
	}

	return drivers ?? []; // Return drivers if not null, otherwise return an empty array
}

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

export async function createLog(newLog: Log) {
	const { error } = await supabase
		.from('driver_logs')
		.insert([newLog])
		.select();

	if (error) {
		console.error(error);
		return error;
	}
}
