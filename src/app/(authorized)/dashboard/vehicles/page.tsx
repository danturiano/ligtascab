"use client";

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
});

const VehicleForm = dynamic(
  () => import("@/features/vehicles/components/add-vehicle-form"),
  { ssr: false }
);

export default function VehiclePage() {
  const { data, isPending } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { vehicles } = await getAllVehicle();
      return { vehicles };
    },
  });

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold">Tricycles</h1>
      <DataTable
        data={data?.vehicles ?? []}
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
