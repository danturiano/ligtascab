import SpinnerLoad from '@/components/spinner-load';

export default function loading() {
	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<SpinnerLoad />
		</div>
	);
}
