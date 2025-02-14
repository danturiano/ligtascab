"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/features/vehicles/components/columns";
import { getPaginatedVehicles, Vehicle } from "@/features/vehicles/db/vehicles";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DataTable = dynamic<{
  data: Vehicle[];
  columns: ColumnDef<Vehicle>[];
  pageCount: number;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
}>(
  () =>
    import("@/features/vehicles/components/data-table").then(
      (mod) => mod.DataTable,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full min-h-[350px] rounded-xl" />,
  },
);

export default function VehiclePage() {
  const [data, setData] = useState<Vehicle[]>([]);
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
        const response = await getPaginatedVehicles({ from, to });
        setData(response.data);
        setTotalCount(response.count);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchData();
  }, [pagination]);

  return (
    <div className="w-full">
      <DataTable
        data={data}
        columns={columns}
        pageCount={Math.ceil(totalCount / pagination.pageSize)}
        onPaginationChange={setPagination}
      />
    </div>
  );
}
