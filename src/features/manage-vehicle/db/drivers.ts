'use server';

import supabase from '@/lib/supabase';
import { Driver } from '../components/columns';

export async function getAllDrivers(): Promise<Driver[]> {
	const { data: drivers, error } = await supabase.from('drivers').select('*');

	if (error) {
		console.error('Error fetching drivers:', error);
		return []; // Ensure the function never returns null
	}

	return drivers ?? []; // Return drivers if not null, otherwise return an empty array
}
