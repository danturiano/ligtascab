import { verifyPassword } from '@/lib/utils';
import { getUser } from '@/services/data-service';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				phone_number: { label: 'Phone number', type: 'string' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				const phone_number = credentials.phone_number as string | undefined;
				const password = credentials.password as string | undefined;

				if (!phone_number || !password) {
					throw new CredentialsSignin('Please provide both email & password');
				}

				// First get the user without password verification
				const user = await getUser(phone_number);

				if (!user) {
					throw new Error('Invalid email');
				}

				if (!user.password) {
					throw new Error('No password set for this user');
				}

				// Verify the password against the stored hash
				const isMatched = verifyPassword(password, user.password);

				if (!isMatched) {
					throw new Error('Invalid password');
				}

				// Return user data without sensitive information
				const userData = {
					id: user.id,
					phone_number: user.phone_number,
				};

				return userData;
			},
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},
		async session({ session }) {
			const currUser = await getUser(session.user.email);
			if (currUser?.id) {
				session.user.id = currUser.id;
			}
			return session;
		},
	},
	pages: {
		signIn: '/sign-in',
	},
});
