"use client";

import SpinnerMini from "@/components/spinner-mini";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerVehicle } from "../actions/vehicles";
import { VehicleSchema } from "../schemas/vehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function VehicleForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof VehicleSchema>>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      plate_number: "",
      registration_number: "",
    },
  });

  const queryClient = useQueryClient();

  const useCreateVehicle = useMutation({
    mutationFn: registerVehicle,
  });

  function onSubmit(data: z.infer<typeof VehicleSchema>) {
    startTransition(async () => {
      useCreateVehicle.mutate(data, {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: ["vehicles", "notifications"],
          });
          if (response.message) {
            toast.success(response.message);
          }
          form.reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="plate_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plate Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registration_expiry"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Registration Expiration Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registration_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <div className="text-sm font-medium text-red-500">
            {form.formState.errors.root.message}
          </div>
        )}
        <Button className="p-1 w-full" disabled={isPending}>
          {!isPending ? "Continue" : <SpinnerMini />}
        </Button>
      </form>
    </Form>
  );
}
