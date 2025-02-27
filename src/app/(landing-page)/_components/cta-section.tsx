import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import android from '/public/android-brand.svg';
import apple from '/public/apple-brand.svg';

export default function CTASection() {
	return (
		<section className="lg:max-w-(--breakpoint-lg) bg-primary p-4 max-w-[90%] container rounded-md mt-16 md:mt-40 text-md leading-tight text-center items-center tracking-tighter text-balance flex flex-col gap-4 md:p-14 md:flex-row">
			<h4 className="font-semibold text-lg text-primary-foreground leading-tight md:text-2xl lg:text-4xl md:text-start">
				Whether it’s a quick trip or a long journey, your ride is just a tap
				away.
			</h4>
			<div className="flex space-x-4">
				<Button
					size="lg"
					className="py-6 px-4 gap-2 md:gap-4 md:px-10 md:py-10 duration-200"
					variant="outline"
				>
					<Image src={apple} alt="apple logo" className="md:h-10 md:w-10" />
					<div className="flex flex-col items-start">
						<p className="text-xs md:text-lg">Download on</p>
						<p className="text-md font-bold md:text-xl">Apple Store</p>
					</div>
				</Button>
				<Button
					size="lg"
					className="py-6 px-4 gap-2 md:gap-4 md:px-10 md:py-10 duration-200"
					variant="outline"
				>
					<Image src={android} alt="apple logo" className="md:h-10 md:w-10" />
					<div className="flex flex-col items-start">
						<p className="text-xs md:text-lg">Download on</p>
						<p className="text-md font-bold md:text-xl">Play Store</p>
					</div>
				</Button>
			</div>
		</section>
	);
}
