'use server';

import supabase from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Driver = {
	id: string;
	name: string;
	license_expiry: string;
	license_number: string;
	phone_number: string;
};

export type Vehicle = {
	id?: string;
	operator_id?: string;
	plate_number: string;
	qr_code?: string | null;
	registration_expiry: string;
	registration_number: string;
	status?: string;
};

export async function getAllDrivers(): Promise<Driver[]> {
	const { data: drivers, error } = await supabase.from('drivers').select('*');

	if (error) {
		console.error('Error fetching drivers:', error);
		return []; // Ensure the function never returns null
	}

	return drivers ?? []; // Return drivers if not null, otherwise return an empty array
}

export async function getAllVehicle(): Promise<Vehicle[]> {
	const { data: vehicles, error } = await supabase.from('vehicles').select('*');

	if (error) {
		console.error('Error fetching drivers:', error);
		return []; // Ensure the function never returns null
	}

	return vehicles ?? []; // Return drivers if not null, otherwise return an empty array
}

export async function createVehicle(newVehicle: Vehicle) {
	const { data, error } = await supabase.from('vehicles').insert([newVehicle]);

	if (error) {
		console.log(error);
		throw new Error('cannot add vehicle');
	}

	return { data, error };
}

export async function deleteVehicle(id: string) {
	const { error } = await supabase.from('vehicles').delete().eq('id', id);

	if (error) {
		console.log(error);
		throw new Error('cannot delete vehicle');
	}

	revalidatePath('/dashboard/manage-vehicle');

	return { error };
}
