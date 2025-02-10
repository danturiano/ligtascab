import { Driver } from '@/features/logs/schemas/logs';
import supabase from '@/lib/supabase';
import { cache } from 'react';

export const getAllDrivers = cache(async (): Promise<Driver[]> => {
	const { data: drivers, error } = await supabase
		.from('drivers')
		.select('*')
		.order('status', { ascending: true });

	if (error) {
		console.error('Error fetching drivers:', error);
		return []; // Ensure the function never returns null
	}

	return drivers ?? []; // Return drivers if not null, otherwise return an empty array
});
