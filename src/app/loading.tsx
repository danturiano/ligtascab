import Spinner from '@/components/spinner';

export default function loading() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<Spinner />
		</div>
	);
}
