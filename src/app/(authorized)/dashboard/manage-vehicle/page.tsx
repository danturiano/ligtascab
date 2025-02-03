import { columns } from '@/features/manage-vehicle/components/columns';
import { DataTable } from '@/features/manage-vehicle/components/data-table';
import { getAllDrivers } from '@/features/manage-vehicle/db/drivers';

export default async function VehiclePage() {
	const data = await getAllDrivers();

	return (
		<div className="container mx-auto px-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
