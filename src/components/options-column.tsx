"use client";

import SpinnerMini from "@/components/spinner-mini";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostgrestError } from "@supabase/supabase-js";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface OptionsColumnProps {
  id: string;
  type: "vehicles" | "drivers";
  deleteFn: (
    id: string
  ) => Promise<
    { error: PostgrestError; data?: undefined } | { data: null; error: null }
  >;
}

export const OptionsColumn = ({ id, deleteFn, type }: OptionsColumnProps) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onDelete = () => {
    startTransition(async () => {
      const { toast } = await import("react-hot-toast");
      const { error } = await deleteFn(id);
      if (error) {
        toast.error(error.message);
      }
      toast.success("Vehicle successfully deleted!");
      setIsOpen(false);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer p-0">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 p-2">
        <DropdownMenuItem className="p-0">
          <Button
            className="w-full"
            variant={"outline"}
            size={"sm"}
            onClick={() => router.push(`/dashboard/${type}/${id}`)}
          >
            View {type}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size={"sm"} className="w-full">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete();
                  }}
                  disabled={isPending}
                >
                  {!isPending ? "Continue" : <SpinnerMini />}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
