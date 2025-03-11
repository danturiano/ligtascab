/* eslint-disable import/no-restricted-paths */
"use client";

import type { Row } from "@tanstack/react-table";
import { Loader, Trash } from "lucide-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteDriver } from "@/features/drivers/db/drivers";
import { deleteVehicle } from "@/features/vehicles/db/vehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tasks: Row<any>["original"][];
  showTrigger?: boolean;
  onSuccess?: () => void;
  filter: string;
}

export function DeleteTasksDialog({
  tasks,
  showTrigger = true,
  filter,
  onSuccess,
  ...props
}: DeleteTasksDialogProps) {
  const [isPending, startTransition] = useTransition();
  const ids = tasks.map((task) => task.id);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: filter === "plate_number" ? deleteVehicle : deleteDriver,
  });

  const onDeleteHandler = () => {
    startTransition(() => {
      deleteMutation.mutate(ids, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [filter === "plate_number" ? "vehicles" : "drivers"],
          });

          props.onOpenChange?.(false);
          toast.success(
            `${filter === "plate_number" ? "Vehicle" : "Driver"} deleted successfully!`
          );
          onSuccess?.();
        },
        onError: () => {
          toast.error(
            `${filter === "plate_number" ? "Vehicle" : "Driver"} deletion unsuccessful.`
          );
        },
      });
    });
  };

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Trash aria-hidden="true" />
            Delete ({tasks.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{tasks.length}</span>
            {tasks.length === 1 ? " task" : " tasks"} from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={onDeleteHandler}
            disabled={isPending}
          >
            {isPending && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
