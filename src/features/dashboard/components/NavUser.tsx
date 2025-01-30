import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/auth';
import { ChevronDown } from 'lucide-react';

export default async function NavUser() {
	const session = await auth();
	if (!session?.user) return null;

	return (
		<div className="flex items-center">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="min-w-52 hover:bg-[#1F9E7F] rounded-lg p-2 flex items-center gap-2 data-[state=open]:bg-[#1F9E7F]">
						<Avatar className="h-8 w-8 rounded-full">
							<AvatarImage
								src={session.user.image ?? undefined}
								alt={session.user.name ?? undefined}
							/>
							<AvatarFallback className="rounded-lg">CN</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight text-white">
							<span className="truncate font-semibold">
								{session.user.name}
							</span>
							<span className="truncate text-xs">{session.user.email}</span>
						</div>
						<ChevronDown className="ml-auto size-4 text-white" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-52 mt-1">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
