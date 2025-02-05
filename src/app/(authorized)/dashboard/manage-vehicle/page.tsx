import { columns } from '@/features/manage-vehicle/components/columns';
import { DataTable } from '@/features/manage-vehicle/components/data-table';
import {
	getAllVehicle
} from '@/features/manage-vehicle/db/vehicles';

export default async function VehiclePage() {
	const data = await getAllVehicle();

	return (
		<div className="container mx-auto px-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
