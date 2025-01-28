// 'use client';

// import SpinnerMini from '@/components/SpinnerMini';
// import { Button } from '@/components/ui/button';
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useTransition } from 'react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { z } from 'zod';
// import { ProfileSchema } from '../_lib/types';

// export default function ProfilingForm() {
// 	const [isPending, startTransition] = useTransition();

// 	const form = useForm<z.infer<typeof ProfileSchema>>({
// 		resolver: zodResolver(ProfileSchema),
// 		defaultValues: {
// 			first_name: '',
// 			last_name: '',
// 			email: '',
// 			subscribe_to_newsletter: false,
// 		},
// 	});

// 	function onSubmit(data: z.infer<typeof ProfileSchema>) {
// 		startTransition(() => {
// 			registerCredentials(data);
// 		});
// 	}

// 	const registerCredentials = async (data: z.infer<typeof ProfileSchema>) => {
// 		const response = await updateProfile(data);
// 		if (response?.message) {
// 			toast.success(response.message);
// 			// redirect('/get-started');
// 		}
// 		if (response?.error) {
// 			toast.error(response.error);
// 		}
// 	};

// 	return (
// 		<Form {...form}>
// 			<form className="w-full space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
// 				<FormField
// 					control={form.control}
// 					name="first_name"
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>First name</FormLabel>
// 							<FormControl>
// 								<Input {...field} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<FormField
// 					control={form.control}
// 					name="last_name"
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Last name</FormLabel>
// 							<FormControl>
// 								<Input {...field} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<FormField
// 					control={form.control}
// 					name="email"
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Email</FormLabel>
// 							<FormControl>
// 								<Input {...field} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				{form.formState.errors.root && (
// 					<div className="text-sm font-medium text-red-500">
// 						{form.formState.errors.root.message}
// 					</div>
// 				)}
// 				<Button className="p-1 w-full" disabled={isPending}>
// 					{!isPending ? 'Continue' : <SpinnerMini />}
// 				</Button>
// 			</form>
// 		</Form>
// 	);
// }
