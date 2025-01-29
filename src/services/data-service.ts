'use server';

import { auth } from '@/lib/auth';
import supabase from '@/lib/supabase';

type User = {
	created_at?: string;
	id?: string;
	password: string;
	phone_number: string;
};

type UserUpdate = {
	first_name: string;
	last_name: string;
	email: string;
	subscribe_newsletter: boolean;
	isNewUser: boolean;
	image?: string;
};

export async function createUser(newUser: User) {
	const { data, error } = await supabase.from('users').insert([newUser]);

	if (error) {
		console.log(error);
		throw new Error('User could not be created');
	}

	return { data, error };
}

export async function updateUser(user: UserUpdate) {
	const session = await auth();

	const phone_number = session?.user.phone_number as string;

	const { data, error } = await supabase
		.from('users')
		.update(user)
		.eq('phone_number', phone_number);

	if (error) {
		console.log(error);
		throw new Error('User could not be created');
	}

	return { data, error };
}

export async function getUser(phone_number: string) {
	const query = supabase
		.from('users')
		.select('*')
		.eq('phone_number', phone_number);

	const { data, error } = await query.single();

	if (error) {
		console.log(error);
	}

	return data;
}
