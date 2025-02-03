'use client';

import {
	AudioWaveform,
	BookOpen,
	Car,
	GalleryVerticalEnd,
	SquareTerminal,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { TeamSwitcher } from '@/components/team-switcher';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'Magsaysay Allied Coop',
			logo: GalleryVerticalEnd,
			plan: 'Tricycle',
		},
		{
			name: 'Magsasay Allied Coop',
			logo: AudioWaveform,
			plan: 'Jeepney',
		},
	],
	navMain: [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: SquareTerminal,
		},
		{
			title: 'Triycle Management',
			url: '#',
			icon: Car,
			isActive: true,
			items: [
				{
					title: 'Tricycles',
					url: '/dashboard/manage-vehicle',
				},
				{
					title: 'Documents',
					url: '#',
				},
				{
					title: 'Maintenance',
					url: '#',
				},
			],
		},
		{
			title: 'Driver Management',
			url: '#',
			icon: BookOpen,
			isActive: false,
			items: [
				{
					title: 'Drivers',
					url: '#',
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<TeamSwitcher teams={data.teams} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
