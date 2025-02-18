"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/features/drivers/components/columns";
import { Driver } from "@/features/drivers/schemas/drivers";
import { createClient } from "@/supabase/client";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DataTable = dynamic<{
  data: Driver[];
  columns: ColumnDef<Driver>[];
  pageCount: number;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
}>(
  () =>
    import("@/features/drivers/components/data-table").then(
      (mod) => mod.DataTable,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full min-h-[350px] rounded-xl" />,
  },
);

export default function DriverPage() {
  const [data, setData] = useState<Driver[]>([]);
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
          .from("drivers")
          .select("*", { count: "exact" })
          .range(from, to)
          .order("status", { ascending: true });
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
    <div>
      <DataTable
        data={data}
        columns={columns}
        pageCount={Math.ceil(totalCount / pagination.pageSize)}
        onPaginationChange={setPagination}
      />
    </div>
  );
}
