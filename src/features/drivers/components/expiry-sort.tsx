import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export default function ExpirySort({
  column,
}: {
  column: Column<
    {
      id: string;
      status: string;
      first_name: string;
      last_name: string;
      license_expiry: string;
      license_number: string;
      operator_id: string;
      phone_number: string;
    },
    unknown
  >;
}) {
  return (
    <div className="flex items-center">
      <p>License Expiry</p>
      <Button
        variant="ghost"
        size={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
