import SpinnerLoad from '@/components/spinner-load';

export default function loading() {
	return (
		<div className="h-screen flex justify-center items-center">
			<SpinnerLoad />
		</div>
	);
}
