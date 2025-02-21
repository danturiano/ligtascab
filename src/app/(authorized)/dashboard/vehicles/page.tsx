"use client";

import SpinnerLoad from "@/components/spinner-load";
import { AddVehicle } from "@/features/vehicles/components/add-vehicle";
import VehicleForm from "@/features/vehicles/components/add-vehicle-form";
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
}>(() => import("@/components/data-table").then((mod) => mod.DataTable), {
  ssr: false,
});

export default function VehiclePage() {
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const { data, isLoading } = useQuery({
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
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <SpinnerLoad />
        </div>
      ) : (
        <DataTable
          data={data?.vehicles ?? []}
          columns={columns}
          pageCount={Math.ceil(totalCount / pagination.pageSize)}
          currentPagination={pagination}
          onPaginationChange={setPagination}
          filter_by={"plate_number"}
        >
          <AddVehicle>
            <VehicleForm />
          </AddVehicle>
        </DataTable>
      )}
    </div>
  );
}
