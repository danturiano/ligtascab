'use client';

import SpinnerMini from '@/components/SpinnerMini';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { register } from '../_lib/actions';
import { UserSchema } from '../_lib/types';

export default function SignUpForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			phone_number: '+63',
			password: '',
			confirm_password: '',
		},
	});

	function onSubmit(data: z.infer<typeof UserSchema>) {
		startTransition(() => {
			registerCredentials(data);
		});
	}

	const registerCredentials = async (data: z.infer<typeof UserSchema>) => {
		const response = await register(data);
		if (response?.message) {
			toast.success(response.message);
			redirect('/sign-in');
		}
		if (response?.error) {
			toast.error(response.error);
		}
	};

	return (
		<Form {...form}>
			<form className="w-full space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="phone_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone number</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="●●●●●●" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirm_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="●●●●●●" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{form.formState.errors.root && (
					<div className="text-sm font-medium text-red-500">
						{form.formState.errors.root.message}
					</div>
				)}
				<Button className="p-1 w-full" disabled={isPending}>
					{!isPending ? 'Continue' : <SpinnerMini />}
				</Button>
			</form>
		</Form>
	);
}
