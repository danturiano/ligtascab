"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/features/logs/components/columns";
import { getAllLogs } from "@/features/logs/db/logs";
import { Log } from "@/features/logs/schemas/logs";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";

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
  filter_by: string;
  children?: React.ReactNode;
  isPending: boolean;
}>(() => import("@/components/data-table").then((mod) => mod.DataTable), {
  ssr: false,
});

export default function DriverLogPage() {
  const { data, isPending } = useQuery({
    queryKey: ["driver_logs"],
    queryFn: async () => {
      const logs = await getAllLogs();
      return logs;
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold">Drivers</h1>
      <div className="w-full md:flex-row md:flex md:gap-6">
        <QRCodeReader />
        <DataTable
          data={data ?? []}
          columns={columns}
          filter_by="driver_name"
          isPending={isPending}
        />
      </div>
    </div>
  );
}
