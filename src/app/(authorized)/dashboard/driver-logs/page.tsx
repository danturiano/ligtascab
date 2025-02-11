"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/features/logs/components/columns";
import { getPaginatedLogs } from "@/features/logs/db/logs";
import { Log } from "@/features/logs/schemas/logs";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import QRCodeReader
const QRCodeReader = dynamic(
  () => import("@/features/logs/components/qr-reader"),
  {
    ssr: false, // Prevents server-side rendering
    loading: () => <Skeleton className="min-w-sm rounded-xl" />,
  },
);

const DataTable = dynamic<{
  data: Log[];
  columns: ColumnDef<Log>[];
  pageCount: number;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
}>(
  () =>
    import("@/features/logs/components/data-table").then(
      (mod) => mod.DataTable,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full min-h-[350px] rounded-xl" />,
  },
);

export default function DriverLogPage() {
  const [data, setData] = useState<Log[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      const from = pagination.pageIndex * pagination.pageSize;
      const to = from + pagination.pageSize - 1;

      try {
        const response = await getPaginatedLogs({ from, to });
        setData(response.data);
        setTotalCount(response.count);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchData();
  }, [pagination]);

  return (
    <div className="px-10 w-full md:flex-row md:flex md:gap-6">
      <QRCodeReader />
      <DataTable
        data={data}
        columns={columns}
        pageCount={Math.ceil(totalCount / pagination.pageSize)}
        onPaginationChange={setPagination}
      />
    </div>
  );
}
