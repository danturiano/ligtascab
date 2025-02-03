'use client';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { redirect } from 'next/navigation';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Driver = {
	id: string;
	name: string;
	license_expiry: string;
	license_number: string;
	phone_number: string;
};

export const columns: ColumnDef<Driver>[] = [
	{
		accessorKey: 'id',
		header: () => <div className="hidden"></div>,
		cell: () => <div className="hidden"></div>,
	},
	{
		accessorKey: 'last_name',
		header: 'Surname',
	},
	{
		accessorKey: 'first_name',
		header: 'First Name',
	},
	{
		accessorKey: 'phone_number',
		header: 'Phone Number',
	},
	{
		accessorKey: 'license_expiry',
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
				{formatDate(row.getValue('license_expiry'))}
			</div>
		),
	},
	{
		accessorKey: 'license_number',
		header: 'License Number',
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => (
			<Button
				variant={'outline'}
				onClick={() => redirect(`manage-vehicle/${row.getValue('id')}`)}
				className="cursor-pointer"
			>
				View Driver
			</Button>
		),
	},
];
