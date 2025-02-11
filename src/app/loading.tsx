import { default as SpinnerLoad } from '@/components/spinner-load';

export default function loading() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<SpinnerLoad />
		</div>
	);
}
