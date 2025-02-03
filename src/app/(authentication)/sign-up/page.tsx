import Navigation from '@/features/authentication/components/auth-nav';
import SignUpForm from '@/features/authentication/components/sign-up-form';
import Link from 'next/link';

export default async function SignUpPage() {
	return (
		<>
			<Navigation />
			<div className="container md:flex items-center justify-center flex-col">
				<div className="flex flex-col rounded-md items-start gap-4 md:gap-6 bg-white">
					<div className="text-start">
						<h1 className="text-2xl font-bold md:text-3xl">
							Create an account
						</h1>
						<div className="flex gap-1 items-center text-sm md:text-lg md:gap-2">
							<p className="text-sm text-muted-foreground md:text-lg">
								Already have an account?
							</p>
							<Link href="/sign-in">
								<span className="text-sm text-primary md:text-lg">
									Sign in.
								</span>
							</Link>
						</div>
					</div>
					<SignUpForm />
				</div>
				<p className="text-xs text-muted-foreground text-center mt-4">
					By signing up, you agree to our{' '}
					<span className="text-primary font-medium">Terms</span> and{' '}
					<span className="text-primary font-medium">Privacy Policy</span>.
				</p>
			</div>
		</>
	);
}
