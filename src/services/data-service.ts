import { auth } from '@/lib/auth';
import supabase from '@/lib/supabase';

type User = {
	created_at?: string;
	email?: string | null;
	fullName?: string | null;
	id?: string;
	image?: string | null;
	isNewUser?: boolean;
	password: string;
	phone_number: string;
};

export async function createUser(newUser: User) {
	const { data, error } = await supabase.from('users').insert([newUser]);

	if (error) {
		console.log(error);
		throw new Error('User could not be created');
	}

	return { data, error };
}

// export async function updateUser(User: User) {
// 	const { data, error } = await supabase
// 		.from('users')
// 		.update([User])
// 		.eq('id', user?.id);

// 	if (error) {
// 		console.log(error);
// 		throw new Error('User could not be created');
// 	}

// 	return { data, error };
// }

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
