"use client";

import { AddDriver } from "@/features/drivers/components/add-driver";
import { columns } from "@/features/drivers/components/columns";
import { getPaginatedDrivers } from "@/features/drivers/db/drivers";
import { Driver } from "@/features/drivers/schemas/drivers";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, OnChangeFn, PaginationState } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { useState } from "react";

const DataTable = dynamic<{
  children: React.ReactNode;
  data: Driver[];
  columns: ColumnDef<Driver>[];
  pageCount: number;
  filter_by: string;
  currentPagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  isPending: boolean;
}>(() => import("@/components/data-table").then((mod) => mod.DataTable), {
  ssr: false,
});

const DriverForm = dynamic(
  () => import("@/features/drivers/components/add-driver-form"),
  { ssr: false }
);

export default function DriverPage() {
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const { data, isPending } = useQuery({
    queryKey: ["drivers", pagination],
    queryFn: async () => {
      const from = pagination.pageIndex * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      const { drivers, count } = await getPaginatedDrivers(from, to);
      setTotalCount(count ?? 0);
      return { drivers, count };
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold">Drivers</h1>
      <DataTable
        data={data?.drivers ?? []}
        columns={columns}
        pageCount={Math.ceil(totalCount / pagination.pageSize)}
        onPaginationChange={setPagination}
        currentPagination={pagination}
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
