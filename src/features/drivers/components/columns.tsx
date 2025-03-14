"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { Driver } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import dynamic from "next/dynamic";

const ExpirySort = dynamic(() => import("./expiry-sort"), {
  loading: () => <div>loading</div>,
  ssr: false,
});
const GenerateQRCode = dynamic(() => import("@/components/generate-qr"), {
  loading: () => <div>loading</div>,
  ssr: false,
});

export const columns: ColumnDef<Driver>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p>Status</p>
          <Button
            variant="ghost"
            size={"icon"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="ml-4">
          {status === "active" ? (
            <Badge>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
          ) : (
            <Badge variant={"destructive"}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: "Full name",
    cell: ({ row }) => {
      const full_name = `${row.original.first_name} ${row.original.last_name}`;
      return <p>{full_name}</p>;
    },
  },
  {
    accessorKey: "license_number",
    header: "License Number",
  },
  {
    accessorKey: "license_expiry",
    header: ({ column }) => <ExpirySort column={column} />,
    cell: ({ row }) => <div>{formatDate(row.getValue("license_expiry"))}</div>,
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "qr_code",
    header: "QR Code",
    cell: ({ row }) => <GenerateQRCode id={row.original.id as string} />,
  },
];
