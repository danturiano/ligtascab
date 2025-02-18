"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/features/logs/components/columns";
import { Log } from "@/features/logs/schemas/logs";
import { createClient } from "@/supabase/client";
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
    pageSize: 7,
  });

  useEffect(() => {
    const fetchData = async () => {
      const from = pagination.pageIndex * pagination.pageSize;
      const to = from + pagination.pageSize - 1;

      try {
        const supabase = createClient();
        const { data, count } = await supabase
          .from("driver_logs")
          .select("*", { count: "exact" })
          .range(from, to)
          .order("created_at", { ascending: false });
        if (data) {
          setData(data);
        }
        if (count) {
          setTotalCount(count);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchData();
  }, [pagination, data]);

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
