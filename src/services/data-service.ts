import { auth } from '@/app/(authentication)/_lib/auth';
import supabase from '@/lib/supabase';

type newUser = {
	id?: string;
	created_at?: string;
	phone_number?: string;
	password?: string;
};

type User = {
	email?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	image?: string | undefined;
};

export async function createUser(newUser: newUser) {
	const { data, error } = await supabase.from('users').insert([newUser]);

	if (error) {
		console.log(error);
		throw new Error('User could not be created');
	}

	return { data, error };
}

export async function updateUser(User: User) {
	const { data, error } = await supabase
		.from('users')
		.update([User])
		.eq('id', user?.id);

	if (error) {
		console.log(error);
		throw new Error('User could not be created');
	}

	return { data, error };
}

export async function getUser(phone_number: string) {
	let query = supabase
		.from('users')
		.select('*')
		.eq('phone_number', phone_number);

	const { data, error } = await query.single();

	if (error) {
		console.log(error);
	}

	return data;
}
