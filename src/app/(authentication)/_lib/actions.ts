'use server';

import { signIn } from '@/lib/auth';
import { saltAndHashPassword } from '@/lib/utils';
import { createUser, getUser } from '@/services/data-service';
import { CredentialsSchema, ProfileSchema, UserSchema } from './types';

export async function signInWithGoogle() {
	await signIn('google', { redirectTo: '/dashboard' });
}

export async function signInWithCredentials(User: unknown) {
	const result = CredentialsSchema.safeParse(User);

	if (!result.success) {
		let errorMessage = '';

		result.error.issues.forEach((issue) => {
			errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
		});

		return {
			error: errorMessage,
		};
	}

	try {
		const response = await signIn('credentials', {
			redirect: false,
			callback: '/',
			phone_number: result.data.phone_number,
			password: result.data.password,
		});

		if (response?.error) {
			throw new Error(response.error.message);
		}

		return { data: response };
	} catch (error) {
		return { error: (error as Error).message };
	}
}

export async function register(User: unknown) {
	const result = UserSchema.safeParse(User);

	if (!result.success) {
		let errorMessage = '';

		result.error.issues.forEach((issue) => {
			errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
		});

		return {
			error: errorMessage,
		};
	}

	const convertedNumber = result.data.phone_number.replace(/^\+63/, '0');

	const user = await getUser(convertedNumber);

	if (user) {
		return {
			error: 'Phone number already used.',
		};
	}

	if (result.data.password !== result.data.confirm_password) {
		return {
			error: 'Password does not match',
		};
	}

	const pwHash = saltAndHashPassword(result.data.password);

	const newUser = {
		phone_number: convertedNumber,
		password: pwHash,
	};

	await createUser(newUser);

	if (result.success) {
		return { message: 'Account created sucessfully' };
	}
}

// export async function updateProfile(User: unknown) {
// 	const result = ProfileSchema.safeParse(User);

// 	if (!result.success) {
// 		let errorMessage = '';

// 		result.error.issues.forEach((issue) => {
// 			errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
// 		});

// 		return {
// 			error: errorMessage,
// 		};
// 	}

// 	const userProfile = {
// 		first_name: result.data.first_name,
// 		last_name: result.data.last_name,
// 		email: result.data.email,
// 	};

// 	await updateUser(userProfile);

// 	if (result.success) {
// 		return { message: 'Success!' };
// 	}
// }
