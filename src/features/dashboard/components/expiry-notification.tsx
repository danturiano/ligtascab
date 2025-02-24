"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Expiry } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, SquareUser } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getNotifications, markAsRead } from "../db/dashboard";
import image from "/public/no-notif.svg";
import { useRouter } from "next/navigation";
import placeholder from "/public/landscape-placeholder.svg";

export default function ExpiryNotifications() {
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { notifications } = await getNotifications();
      const newNotification = notifications.filter((item: Expiry) => {
        return item.mark_as_read === false;
      });
      if (newNotification) {
        setTotalCount(newNotification.length);
      }
      return { notifications };
    },
    refetchInterval: 120000,
  });

  const queryClient = useQueryClient();

  const useMarkAsRead = useMutation({
    mutationFn: markAsRead,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1">
          <Badge
            className={`text-[10px] px-1.5 py-0.5 font-thin ${!!totalCount ? "" : "hidden"}`}
          >
            {totalCount} new
          </Badge>
          <p className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-sm text-transparent flex cursor-pointer hover:bg-gradient-to-r hover:from-green-700 hover:to-green-600">
            Notifications
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={`max-h-72 w-[19.3rem] shadow-none overflow-auto rounded-md bg-slate-50 ${!totalCount ? "absolute -left-11 items-center justify-center" : ""}`}
      >
        {data?.notifications ? (
          <div>
            {data?.notifications.map((item: Expiry) => {
              return (
                <AlertDialog key={item.id}>
                  <AlertDialogTrigger asChild>
                    <div
                      className={`m-2 rounded-md flex gap-3 p-2 hover:bg-slate-100 items-center cursor-pointer ${!item.mark_as_read && "bg-slate-200 hover:bg-slate-300"}`}
                    >
                      <div
                        className={`size-9 rounded-full flex items-center justify-center border border-gray-700 }`}
                      >
                        {item.source_table === "drivers" ? (
                          <SquareUser size={19} color="#1F9E7F" />
                        ) : (
                          <FileText size={19} color="#FFB129" />
                        )}
                      </div>
                      <div className="flex flex-col text-start">
                        <p
                          className={`text-[13px] tracking-tight ${item.mark_as_read && "text-gray-500"}`}
                        >
                          {`${!!item.full_name ? item.full_name + "'s license will expire soon." : item.plate_number + " registration will expire soon."}`}
                        </p>
                        <p
                          className={`text-xs ${item.mark_as_read && "text-gray-500"}`}
                        >{`${!!item.full_name ? "license will expire on " + formatDate(item.expiry_date.toLocaleString()) : "registration will expire on " + formatDate(item.expiry_date.toLocaleString())}`}</p>
                      </div>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-72">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Information</AlertDialogTitle>
                      <Image
                        src={placeholder}
                        className="rounded-md border-2 border-gray-500"
                        alt="profile place holder"
                      />
                      <div className="flex flex-col space-y-2">
                        <p className="text-sm">{`${!!item.full_name ? "Name: " + `${item.full_name}` : "Plate Number: " + `${item.plate_number}`}`}</p>
                        <p className="text-sm">{`${!!item.full_name ? "License Expiry: " + formatDate(item.expiry_date.toLocaleString()) : "Registration Expiry: " + formatDate(item.expiry_date.toLocaleString())}`}</p>
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction
                        onClick={() =>
                          router.push(
                            `/dashboard/${item.source_table}/${item.source_id}`
                          )
                        }
                      >
                        Go to Profile
                      </AlertDialogAction>
                      <AlertDialogCancel
                        onClick={async () => {
                          useMarkAsRead.mutate(item.id, {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: ["notifications"],
                              });
                            },
                          });
                        }}
                      >
                        Cancel
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-6">
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
