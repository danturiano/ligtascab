'use server';

import { auth } from '@/lib/auth';
import supabase from '@/lib/supabase';

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

export async function isNewUser() {
	const session = await auth();
	if (!session) {
		return null;
	}

	const user = await getUser(session.user.phone_number);

	return user.isNewUser;
}
