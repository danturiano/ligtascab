"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { getNotifications } from "../db/dashboard";
import image from "/public/no-notif.svg";

export default function ExpiryNotifications() {
  const [totalCount, setTotalCount] = useState(0);

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { notifications, count } = await getNotifications();
      if (count) {
        setTotalCount(count);
      }
      return { notifications };
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1">
          {totalCount !== 0 && (
            <Badge className="text-[10px] px-1.5 py-0.5 font-thin">
              {totalCount} new
            </Badge>
          )}
          <p className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-sm text-transparent flex cursor-pointer hover:bg-gradient-to-r hover:from-green-700 hover:to-green-600">
            Notifications
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={`max-h-72 w-[16.5rem] overflow-auto rounded-sm bg-slate-50 ${!totalCount ? "flex items-center justify-center" : ""}`}
      >
        {!!totalCount ? (
          <div>
            {data?.notifications?.map((item) => (
              <Alert key={item.id} className="rounded-none">
                <AlertTitle>Driver License Expiring Soon</AlertTitle>
                <AlertDialog>
                  {/* {driver.first_name}&apos;s license will expire on{" "} */}
                  {item.expiry_date?.toString()}
                </AlertDialog>
              </Alert>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src={image} alt="notif" height={160} width={160} />
            <p className="text-xs text-center text-balance font-normal text-gray-400">
              Everything is up to date! No new notifications to worry about.
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
