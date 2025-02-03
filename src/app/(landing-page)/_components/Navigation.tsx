import BrandLogo from '@/components/brand-logo';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import NavMobile from './NavMobile';
import PopoverItem from './PopoverItem';

export default function Navigation() {
	return (
		<header className="py-4 fixed top-0 w-full z-10 shadow-xs bg-background/95 md:py-6 md:flex">
			<nav className="flex items-center justify-between container">
				<div className="flex items-center gap-8">
					<Link href="/">
						<BrandLogo />
					</Link>
					<div className="hidden md:flex md:items-center md:gap-2 md:font-medium md:text-md">
						<Popover>
							<PopoverTrigger className="flex items-center gap-2 hover:bg-accent py-2 px-4 rounded-lg data-[state=open]:bg-accent">
								Product
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="#000000"
									viewBox="0 0 256 256"
								>
									<path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
								</svg>
							</PopoverTrigger>
							<PopoverContent align="start" className="shadow-none flex">
								<div className="flex flex-col gap-2 w-[25rem] border-r">
									<div className="flex flex-col p-4 gap-2">
										<p className="font-medium text-lg">Features</p>
										<PopoverItem
											title="Lorem ipsum"
											subtitle="Model, sync, and protect your data."
										>
											<ShoppingBag />
										</PopoverItem>
										<PopoverItem
											title="Lorem ipsum"
											subtitle="Model, sync, and protect your data."
										>
											<ShoppingBag />
										</PopoverItem>
										<PopoverItem
											title="Lorem ipsum"
											subtitle="Model, sync, and protect your data."
										>
											<ShoppingBag />
										</PopoverItem>
										<Separator />
										<PopoverItem
											title="Lorem ipsum"
											subtitle="Model, sync, and protect your data."
										>
											<ShoppingBag />
										</PopoverItem>
									</div>
								</div>
								<div className="flex flex-col p-4 gap-2">
									<PopoverItem
										title="Lorem Ipsum"
										subtitle="Model, sync, and protect your data."
									/>
									<PopoverItem
										title="Lorem Ipsum"
										subtitle="Model, sync, and protect your data."
									/>
									<PopoverItem
										title="Lorem Ipsum"
										subtitle="Model, sync, and protect your data."
									/>
								</div>
							</PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger className="flex items-center gap-2 hover:bg-accent py-2 px-4 rounded-lg data-[state=open]:bg-accent">
								Resources
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="#000000"
									viewBox="0 0 256 256"
								>
									<path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
								</svg>
							</PopoverTrigger>
							<PopoverContent align="start" className="shadow-none flex">
								<div className="flex flex-col gap-2 w-[25rem] border-r">
									<div className="flex flex-col p-4 gap-2">
										<p className="font-medium text-lg">References</p>
										<PopoverItem
											title="Lorem ipsum"
											subtitle="Model, sync, and protect your data."
										>
											<ShoppingBag />
										</PopoverItem>
										<PopoverItem
											title="Lorem ipsum"
											subtitle="Model, sync, and protect your data."
										>
											<ShoppingBag />
										</PopoverItem>
										<PopoverItem
											title="Lorem ipsum"
											subtitle="Model, sync, and protect your data."
										>
											<ShoppingBag />
										</PopoverItem>
										<Separator />
										<PopoverItem
											title="Lorem ipsum"
											subtitle="Model, sync, and protect your data."
										>
											<ShoppingBag />
										</PopoverItem>
									</div>
								</div>
								<div className="flex flex-col p-4 gap-2">
									<PopoverItem
										title="Lorem Ipsum"
										subtitle="Model, sync, and protect your data."
									/>
									<PopoverItem
										title="Lorem Ipsum"
										subtitle="Model, sync, and protect your data."
									/>
									<PopoverItem
										title="Lorem Ipsum"
										subtitle="Model, sync, and protect your data."
									/>
								</div>
							</PopoverContent>
						</Popover>
						<Link
							href="/"
							className="hover:bg-primary p-2 rounded-md hover:text-primary-foreground duration-200 hover:font-regular"
						>
							Customers
						</Link>
					</div>
				</div>
				<div className="hidden md:flex md:space-x-4">
					<Link href="/sign-up">
						<Button variant="outline" className="rounded-lg">
							Sign up
						</Button>
					</Link>
					<Link href="/sign-in">
						<Button className="px-5 rounded-lg">Operator Login</Button>
					</Link>
				</div>
				<div className="md:hidden">
					<NavMobile />
				</div>
			</nav>
		</header>
	);
}
