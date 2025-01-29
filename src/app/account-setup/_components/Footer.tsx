import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="w-full py-4 flex gap-4 items-center justify-center fixed bottom-0 mb-6">
			<div>
				<p className="text-xs text-[#868686]">
					Copyright © 2024 - All right reserved by Ligtascab
				</p>
			</div>
			<div className="flex text-xs items-center gap-4 md:text-md">
				<Link href="/">Privacy Policy</Link>
				<Link href="/">Logout</Link>
			</div>
		</footer>
	);
}
