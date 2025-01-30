import supabase from '@/lib/supabase';

type User = {
	created_at?: string;
	id?: string;
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
