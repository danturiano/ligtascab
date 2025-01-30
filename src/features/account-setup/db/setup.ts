import { auth } from '@/lib/auth';
import supabase from '@/lib/supabase';
import { ProfileSchema } from '../schemas/setup';

type UserUpdate = {
	first_name: string;
	last_name: string;
	email: string;
	subscribe_newsletter: boolean;
	isNewUser: boolean;
	image?: string;
};

export async function updateProfile(User: unknown) {
	const result = ProfileSchema.safeParse(User);

	if (!result.success) {
		let errorMessage = '';

		result.error.issues.forEach((issue) => {
			errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
		});

		return {
			error: errorMessage,
		};
	}

	const userProfile = {
		first_name: result.data.first_name,
		last_name: result.data.last_name,
		email: result.data.email,
		subscribe_newsletter: result.data.subscribe,
		isNewUser: false,
	};

	await updateUser(userProfile);

	if (result.success) {
		return { message: 'Success!' };
	}
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
