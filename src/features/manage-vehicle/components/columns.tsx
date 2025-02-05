'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Download } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Vehicle } from '../db/vehicles';
import { VehicleDelete } from './vehicle-delete';

export const columns: ColumnDef<Vehicle>[] = [
	{
		accessorKey: 'id',
		header: () => <div className="hidden"></div>,
		cell: () => <div className="hidden"></div>,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status') as string;
			return (
				<div>
					{status === 'active' ? (
						<Badge>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
					) : (
						<Badge variant={'destructive'}>
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Badge>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: 'plate_number',
		header: 'Plate Number',
	},
	{
		accessorKey: 'registration_expiry',
		header: ({ column }) => {
			return (
				<div className="flex items-center">
					<p>Registration Expiry</p>
					<Button
						variant="ghost"
						size={'icon'}
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="p-0 hover:bg-transparent"
					>
						<ArrowUpDown className="h-4 w-4" />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => (
			<div>{formatDate(row.getValue('registration_expiry'))}</div>
		),
	},
	{
		accessorKey: 'registration_number',
		header: 'Registration Number',
	},
	{
		accessorKey: 'qr_code',
		header: 'QR Code',
		cell: ({ row }) => (
			<Button
				onClick={() => redirect(`manage-vehicle/${row.getValue('id')}`)}
				className="cursor-pointer [&_svg]:size-5"
				variant={'ghost'}
				size={'icon'}
			>
				<Download />
			</Button>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => <VehicleDelete id={row.getValue('id') as string} />,
	},
];
