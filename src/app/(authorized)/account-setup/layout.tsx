import Footer from '@/features/account-setup/components/footer';
import { Toaster } from 'react-hot-toast';

export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			{children}
			<Toaster
				position="bottom-center"
				containerStyle={{
					top: 20,
					left: 20,
					bottom: 80,
					right: 20,
				}}
			/>
			<Footer />
		</div>
	);
}
