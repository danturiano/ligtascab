"use client";

import { AddVehicle } from "@/features/vehicles/components/add-vehicle";
import { columns } from "@/features/vehicles/components/columns";
import { getPaginatedVehicles, Vehicle } from "@/features/vehicles/db/vehicles";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, OnChangeFn, PaginationState } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { useState } from "react";

const DataTable = dynamic<{
  children: React.ReactNode;
  data: Vehicle[];
  columns: ColumnDef<Vehicle>[];
  pageCount: number;
  filter_by: string;
  currentPagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  isPending: boolean;
}>(() => import("@/components/data-table").then((mod) => mod.DataTable), {
  ssr: false,
});

const VehicleForm = dynamic(
  () => import("@/features/vehicles/components/add-vehicle-form"),
  { ssr: false }
);

export default function VehiclePage() {
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const { data, isPending } = useQuery({
    queryKey: ["vehicles", pagination],
    queryFn: async () => {
      const from = pagination.pageIndex * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      const { vehicles, count } = await getPaginatedVehicles(from, to);
      if (count) {
        setTotalCount(count);
      }
      return { vehicles, count };
    },
  });

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold">Tricycles</h1>
      <DataTable
        data={data?.vehicles ?? []}
        columns={columns}
        pageCount={Math.ceil(totalCount / pagination.pageSize)}
        currentPagination={pagination}
        onPaginationChange={setPagination}
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
