'use server';

import { signIn } from '@/lib/auth';
import { saltAndHashPassword } from '@/lib/utils';
import { getUser } from '@/services/data-service';
import { createUser } from '../db/authentication';
import { CredentialsSchema, UserSchema } from '../schemas/authentication';

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
