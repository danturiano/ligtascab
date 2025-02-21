"use client";

import SpinnerLoad from "@/components/spinner-load";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/features/logs/components/columns";
import { getPaginatedLogs } from "@/features/logs/db/logs";
import { Log } from "@/features/logs/schemas/logs";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, OnChangeFn, PaginationState } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import QRCodeReader
const QRCodeReader = dynamic(
  () => import("@/features/logs/components/qr-reader"),
  {
    ssr: false, // Prevents server-side rendering
    loading: () => <Skeleton className="min-w-sm rounded-xl" />,
  }
);

const DataTable = dynamic<{
  data: Log[];
  columns: ColumnDef<Log>[];
  pageCount: number;
  filter_by: string;
  currentPagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  children?: React.ReactNode;
}>(() => import("@/components/data-table").then((mod) => mod.DataTable), {
  ssr: false,
});

export default function DriverLogPage() {
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const { data, isPending } = useQuery({
    queryKey: ["driver_logs", pagination],
    queryFn: async () => {
      const from = pagination.pageIndex * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      const { logs, count } = await getPaginatedLogs(from, to);
      if (count) {
        setTotalCount(count);
      }
      return { logs };
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold">Drivers</h1>
      <div className="w-full md:flex-row md:flex md:gap-6">
        <QRCodeReader />
        {isPending ? (
          <div className="w-full flex items-center justify-center">
            <SpinnerLoad />
          </div>
        ) : (
          <DataTable
            data={data?.logs ?? []}
            columns={columns}
            pageCount={Math.ceil(totalCount / pagination.pageSize)}
            onPaginationChange={setPagination}
            filter_by="driver_name"
            currentPagination={pagination}
          />
        )}
      </div>
    </div>
  );
}
