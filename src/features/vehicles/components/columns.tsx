"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import dynamic from "next/dynamic";
import { Vehicle } from "../db/vehicles";

const GenerateQRCode = dynamic(
  () => import("../../../components/generate-qr"),
  {
    loading: () => <div>loading</div>,
    ssr: false,
  }
);

export const columns: ColumnDef<Vehicle>[] = [
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
    accessorKey: "plate_number",
    header: () => <div className="min-w-24">Plate Number</div>,
    cell: ({ row }) => (
      <div className="min-w-24">{row.getValue("plate_number")}</div>
    ),
  },
  {
    accessorKey: "registration_expiry",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p>Registration Expiry</p>
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
    cell: ({ row }) => (
      <div>{formatDate(row.getValue("registration_expiry"))}</div>
    ),
  },
  {
    accessorKey: "registration_number",
    header: "Registration Number",
  },
  {
    accessorKey: "qr_code",
    header: "QR Code",
    cell: ({ row }) => <GenerateQRCode id={row.original.id as string} />,
  },
];
