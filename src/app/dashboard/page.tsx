import { auth } from '@/lib/auth';
import Navigation from './_components/Navigation';
import Sidebar from './_components/Sidebar';

export default async function Page() {
	const session = await auth();
	if (!session) return null;

	console.log(session);

	return (
		<div className="h-screen flex flex-col">
			<Navigation />
			<Sidebar />
		</div>
	);
}
