import { columns } from '@/features/drivers/components/columns';
import { DataTable } from '@/features/drivers/components/data-table';
import { getAllDrivers } from '@/features/drivers/db/drivers';
import React from 'react';

export default async function DriverPage() {
	const drivers = await getAllDrivers();

	return (
		<div>
			<DataTable data={drivers} columns={columns} />
		</div>
	);
}
