import supabase from '@/lib/supabase';
import { cache } from 'react';
import { Driver, Log } from '../schemas/logs';

export type ApiResponse<T> = {
	data?: T;
	error?: string;
	message?: string;
};

export const getDriver = async (id: string): Promise<Driver> => {
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
};

export const updateVehicleStatus = async (plate_number: string) => {
	const { error } = await supabase
		.from('vehicles')
		.update({ status: 'active' })
		.eq('plate_number', plate_number)
		.select();

	if (error) {
		console.error('Error updating driver status:', error);
		return { error: error.message };
	}
};

export const updateDriverStatus = async (id: string) => {
	const { error } = await supabase
		.from('drivers')
		.update({ status: 'active' })
		.eq('id', id)
		.select();

	if (error) {
		console.error('Error updating driver status:', error);
		return { error: error.message };
	}
};

export const getAvailableVehicle = cache(async (): Promise<string[]> => {
	const { data: vehicles, error } = await supabase
		.from('vehicles')
		.select('plate_number')
		.eq('status', 'inactive');

	if (error) {
		console.error('Error fetching vehicles:', error);
		return [];
	}

	return vehicles?.map((vehicle) => vehicle.plate_number) ?? [];
});

export const getAllLogs = cache(async (): Promise<Log[]> => {
	const { data: logs, error } = await supabase.from('driver_logs').select('*');

	if (error) {
		console.error(error);
		return [];
	}

	return logs ?? [];
});

export const checkLog = async (newLog: Log): Promise<ApiResponse<unknown>> => {
	const { data, error } = await supabase
		.from('driver_logs')
		.select('driver_id')
		.eq('driver_id', newLog.driver_id)
		.maybeSingle();

	if (error) {
		return { error: error.message };
	}

	if (data) {
		return { error: 'Driver is currently active' };
	}

	return { data: null };
};

export const createLog = async (newLog: Log): Promise<ApiResponse<Log>> => {
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
};
