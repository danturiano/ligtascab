import QRCodeReader from '@/features/logs/components/qr-reader';

export default function DriverLogPage() {
	return (
		<div className="px-10 container flex flex-col items-center">
			<QRCodeReader />
		</div>
	);
}
