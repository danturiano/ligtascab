import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import React from 'react';

export default function NotificationDashboard() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="rounded-full p-2 bg-[#1F9E7F]">
					<Bell className="text-white" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Notifications</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
