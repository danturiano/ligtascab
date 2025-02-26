"use client";

import DataTableSkeleton from "@/components/data-table-skeleton";
import { AddDriver } from "@/features/drivers/components/add-driver";
import { columns } from "@/features/drivers/components/columns";
import { getAllDrivers } from "@/features/drivers/db/drivers";
import { Driver } from "@/features/drivers/schemas/drivers";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";

const DataTable = dynamic<{
  children: React.ReactNode;
  data: Driver[];
  columns: ColumnDef<Driver>[];
  filter_by: string;
  isPending: boolean;
}>(() => import("@/components/data-table").then((mod) => mod.DataTable), {
  ssr: false,
  loading: () => <DataTableSkeleton />,
});

const DriverForm = dynamic(
  () => import("@/features/drivers/components/add-driver-form"),
  { ssr: false }
);

export default function DriverPage() {
  const {
    data: drivers,
    isPending,
    error,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDrivers,
  });

  if (error) {
    return <div>Error loading drivers: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Drivers</h1>
      <DataTable
        data={drivers ?? []}
        columns={columns}
        filter_by="last_name"
        isPending={isPending}
      >
        <AddDriver>
          <DriverForm />
        </AddDriver>
      </DataTable>
    </div>
  );
}
