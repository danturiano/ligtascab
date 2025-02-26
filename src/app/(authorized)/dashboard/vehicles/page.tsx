"use client";

import DataTableSkeleton from "@/components/data-table-skeleton";
import { AddVehicle } from "@/features/vehicles/components/add-vehicle";
import { columns } from "@/features/vehicles/components/columns";
import { getAllVehicle, Vehicle } from "@/features/vehicles/db/vehicles";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";

const DataTable = dynamic<{
  children: React.ReactNode;
  data: Vehicle[];
  columns: ColumnDef<Vehicle>[];
  filter_by: string;
  isPending: boolean;
}>(() => import("@/components/data-table").then((mod) => mod.DataTable), {
  ssr: false,
  loading: () => <DataTableSkeleton />,
});

const VehicleForm = dynamic(
  () => import("@/features/vehicles/components/add-vehicle-form"),
  { ssr: false }
);

export default function VehiclePage() {
  const {
    data: vehicles,
    isPending,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicle,
  });

  if (error) {
    return <div>Error loading vehicles: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold">Tricycles</h1>
      <DataTable
        data={vehicles ?? []}
        columns={columns}
        filter_by={"plate_number"}
        isPending={isPending}
      >
        <AddVehicle>
          <VehicleForm />
        </AddVehicle>
      </DataTable>
    </div>
  );
}
