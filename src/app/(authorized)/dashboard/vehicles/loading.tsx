import Spinner from '@/components/spinner';

export default function loading() {
	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<Spinner />
		</div>
	);
}
