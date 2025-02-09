import { columns } from '@/features/vehicles/components/columns';
import { DataTable } from '@/features/vehicles/components/data-table';
import { getAllVehicle } from '@/features/vehicles/db/vehicles';

export default async function VehiclePage() {
	const data = await getAllVehicle();

	return (
		<div className="w-full">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
