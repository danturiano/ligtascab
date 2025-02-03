import BrandLogo from '@/components/brand-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navigation() {
	return (
		<header className="py-4 fixed top-0 w-full z-10 shadow-sm bg-background/95 md:py-6 md:flex">
			<nav className="flex items-center justify-between gap-10 container font-regular">
				<Link href="/">
					<BrandLogo />
				</Link>
				<Link href="/">
					<Button
						className="py-2 text-muted-foreground hover:text-primary"
						variant="outline"
					>
						Home
					</Button>
				</Link>
			</nav>
		</header>
	);
}
