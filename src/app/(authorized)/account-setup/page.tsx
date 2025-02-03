import BrandLogo from '@/components/brand-logo';
import ProfilingForm from '@/features/account-setup/components/profiling-form';
import { isNewUser } from '@/services/data-service';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import dashboard from '/public/dashboard-ex.svg';

export default async function Page() {
	const newUser = await isNewUser();
	if (!newUser) {
		redirect('/dashboard');
	}

	return (
		<div className="flex flex-col gap-4 items-center">
			<BrandLogo />
			<div className="max-w-[1100px] border border-gray-300 rounded-2xl items-center grid grid-cols-[0.9fr_1fr] gap-24">
				<div className="p-16 flex flex-col gap-8">
					<div>
						<p>1/5</p>
						<p className="font-semibold text-2xl">Let&apos;s get to know you</p>
					</div>
					<div className="space-y-6">
						<ProfilingForm />
					</div>
				</div>
				<Image
					src={dashboard}
					alt="dashboard"
					className="opacity-85 rounded-tl-md rounded-bl-md"
				/>
			</div>
		</div>
	);
}
