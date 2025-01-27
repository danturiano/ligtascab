import { subscribe } from 'diagnostics_channel';
import { z } from 'zod';

export const UserSchema = z.object({
	id: z.string().uuid().optional(),
	phone_number: z.string().startsWith('+63').min(13).max(13),
	password: z
		.string()
		.min(6, {
			message: 'password must be at least 6 characters',
		})
		.max(30),
	confirm_password: z
		.string()
		.min(6, {
			message: 'password must be at least 6 characters',
		})
		.max(30),
});

export const CredentialsSchema = z.object({
	phone_number: z.string().min(10).max(13),
	password: z.string().min(6, {
		message: 'password must be at least 6 characters',
	}),
});

export const ProfileSchema = z.object({
	first_name: z.string().min(2),
	last_name: z.string().min(2),
	email: z.string().email(),
	profile_picture: z.string().url(),
	subscribe_to_newsletter: z.boolean(),
});
