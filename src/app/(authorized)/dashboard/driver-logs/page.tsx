import { columns } from '@/features/logs/components/columns';
import { DataTable } from '@/features/logs/components/data-table';
import QRCodeReader from '@/features/logs/components/qr-reader';
import { getAllLogs } from '@/features/logs/db/logs';

export default async function DriverLogPage() {
	const data = await getAllLogs();

	return (
		<div className="px-10 w-full md:flex-row md:flex md:gap-6">
			<QRCodeReader />
			<DataTable data={data} columns={columns} />
		</div>
	);
}
