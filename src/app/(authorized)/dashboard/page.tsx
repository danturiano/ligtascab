import Navigation from '@/features/dashboard/components/Navigation';
import Sidebar from '@/features/dashboard/components/Sidebar';
import { isNewUser } from '@/services/data-service';
import { redirect } from 'next/navigation';

export default async function Page() {
	const newUser = await isNewUser();
	if (newUser) {
		redirect('/account-setup');
	}
	return (
		<div className="h-screen flex flex-col">
			<Navigation />
			<Sidebar />
		</div>
	);
}
