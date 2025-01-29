import { redirect } from 'next/navigation';
import { isNewUser } from '../account-setup/_lib/actions';
import Navigation from './_components/Navigation';
import Sidebar from './_components/Sidebar';

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
