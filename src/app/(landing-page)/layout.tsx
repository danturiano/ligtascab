import { ReactNode } from 'react';
import Navigation from './_components/Navigation';

export default function LandingLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<Navigation />
			{children}
		</div>
	);
}
