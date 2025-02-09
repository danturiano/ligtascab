'use client';

import { Badge } from '@/components/ui/badge';
import { Driver } from '@/features/logs/schemas/logs';
import GenerateQRCode from '@/features/vehicles/components/generate-qr';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Driver>[] = [
	{
		accessorKey: 'status',
		header: () => <div className="ml-4">Status</div>,
		cell: ({ row }) => {
			const status = row.getValue('status') as string;
			return (
				<div className="ml-4">
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
		accessorKey: 'last_name',
		header: 'Full name',
		cell: ({ row }) => {
			const full_name = `${row.original.first_name} ${row.original.last_name}`;
			return <p>{full_name}</p>;
		},
	},
	{
		accessorKey: 'license_number',
		header: 'License Number',
	},
	{
		accessorKey: 'phone_number',
		header: 'Phone Number',
	},
	{
		accessorKey: 'qr_code',
		header: 'QR Code',
		cell: ({ row }) => <GenerateQRCode id={row.original.id as string} />,
	},
];
