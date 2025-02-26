import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function DataTableSkeleton() {
  return (
    <div className="mt-2 w-full flex flex-col gap-4">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[24rem] rounded-md" />
          <Skeleton className="h-10 w-[8rem] rounded-md" />
        </div>
        <Skeleton className="h-10 w-[8rem] rounded-md" />
      </div>
      <div>
        <Skeleton className="w-full h-[30rem]" />
      </div>
      <div className="flex gap-2 justify-end">
        <Skeleton className="h-10 w-[8rem] rounded-md" />
        <Skeleton className="h-10 w-[8rem] rounded-md" />
      </div>
    </div>
  );
}
