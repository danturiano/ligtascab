import BrandLogo from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';
import React from 'react';
import ProfilingForm from '../_components/ProfilingForm';

export default function GetStartedPage() {
	return (
		<>
			<BrandLogo />
			<div className="container w-full border border-accent rounded-lg grid-cols-[1fr,1fr]">
				<div className="p-8 flex flex-col gap-8">
					<div>
						<p>1/5</p>
						<p className="font-semibold text-2xl">Let's get to know you</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="size-20 bg-primary rounded-full"></div>
						<div className="flex flex-col gap-2">
							<p className="font-semibold text-lg">Profile Picture</p>
							<div className="flex gap-2">
								<Button variant={'outline'}>Upload Image</Button>
								<Button variant={'outline'} disabled={true}>
									Remove
								</Button>
							</div>
							<p className="text-muted tracking-tight">
								*.png, *.jpeg files up to 10MB at least 400px by 400px
							</p>
						</div>
						<div>
							<ProfilingForm />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
