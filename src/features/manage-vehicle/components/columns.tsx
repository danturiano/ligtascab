'use client';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Download } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Vehicle } from '../db/vehicles';

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
				<div
					className={`${
						status === 'active' ? 'bg-primary' : 'bg-red-700'
					} text-center rounded-2xl text-white p-1`}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</div>
			);
		},
	},
	{
		accessorKey: 'plate_number',
		header: ({ column }) => {
			return <div className="text-end">Plate Number</div>;
		},
		cell: ({ row }) => (
			<div className="text-end">{row.getValue('plate_number')}</div>
		),
	},
	{
		accessorKey: 'registration_expiry',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Registration Expiry
					<ArrowUpDown className="h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="text-end max-w-36">
				{formatDate(row.getValue('registration_expiry'))}
			</div>
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
				className="cursor-pointer"
			>
				<Download />
			</Button>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		header: 'More Information',
		cell: ({ row }) => (
			<Button
				variant={'outline'}
				onClick={() => redirect(`manage-vehicle/${row.getValue('id')}`)}
				className="cursor-pointer"
			>
				View Vehicle
			</Button>
		),
	},
];
