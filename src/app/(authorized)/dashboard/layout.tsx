import Navigation from '@/features/dashboard/components/dashboard-nav';
import Sidebar from '@/features/dashboard/components/Sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen flex flex-col">
			<Navigation />
			<Sidebar>{children}</Sidebar>
		</div>
	);
}
