import Navigation from '@/features/dashboard/components/dashboard-nav';
import Sidebar from '@/features/dashboard/components/sidebar';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<Navigation />
			<Sidebar>{children}</Sidebar>
			<Toaster
				position="bottom-center"
				containerStyle={{
					top: 20,
					left: 20,
					bottom: 80,
					right: 20,
				}}
			/>
		</div>
	);
}
