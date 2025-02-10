'use client';

import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Log } from '../schemas/logs';

export const columns: ColumnDef<Log>[] = [
	{
		accessorKey: 'log_type',
		header: () => <div className="ml-4">Status</div>,
		cell: ({ row }) => {
			const type = row.getValue('log_type') as string;
			return (
				<div className="ml-4">
					{type === 'Time-in' ? (
						<Badge>{type}</Badge>
					) : (
						<Badge variant={'outline'}>{type}</Badge>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: 'created_at',
		header: () => <div>Time & Date</div>,
		cell: ({ row }) => {
			const formattedDate = formatDateTime(row.getValue('created_at'));
			return <div>{formattedDate}</div>;
		},
	},
	{
		accessorKey: 'driver_name',
		header: 'Full name',
	},
	{
		accessorKey: 'plate_number',
		header: 'Plate Number',
	},
];
