"use client";

import SpinnerMini from "@/components/spinner-mini";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createNewLog } from "../actions/logs";
import { getAvailableVehicle } from "../db/logs";
import { LogSchema } from "../schemas/logs";
import { Driver } from "@/types/types";

type LogFormProps = {
  driver: Driver | null;
};

export default function LogForm({ driver }: LogFormProps) {
  const [isPending, startTransition] = useTransition();
  // const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);

  console.log(driver);

  const form = useForm<z.infer<typeof LogSchema>>({
    resolver: zodResolver(LogSchema),
    defaultValues: {
      driver: {
        first_name: "",
        id: "",
        last_name: "",
        license_expiry: new Date(0),
        license_number: "",
        operator_id: "",
        phone_number: "",
        status: "",
        image: "",
      },
      driver_name: driver ? `${driver.first_name} ${driver.last_name}` : "",
      plate_number: "",
      log_type: "Time-in",
    },
  });

  useEffect(() => {
    if (driver) {
      driver.license_expiry = new Date(driver.license_expiry);
      const driver_name = `${driver.first_name} ${driver.last_name}`;
      form.setValue("driver_name", driver_name);
      form.setValue("driver", driver);
    }
  }, [driver, form]);

  const { data: plate_numbers } = useQuery({
    queryKey: ["fetch_vehicles"],
    queryFn: async () => {
      if (!open) return [];
      const availableVehicles = await getAvailableVehicle();
      return availableVehicles;
    },
  });

  const queryClient = useQueryClient();

  const useCreateNewLog = useMutation({
    mutationFn: createNewLog,
  });

  const onSubmit = async (data: z.infer<typeof LogSchema>) => {
    startTransition(() => {
      useCreateNewLog.mutate(data, {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: ["driver_logs"],
          });
          if (response?.message) {
            toast.success(response.message);
            form.reset();
          }
          if (response?.error) {
            toast.error(response.error);
          }
        },
      });
    });
  };

  return (
    <div className="md:w-[384px]">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="driver_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Name</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 items-center justify-center">
            <FormField
              control={form.control}
              name="plate_number"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full mt-2">
                  <FormLabel className="mb-1">
                    Select Available Vehicle
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          disabled={form.getValues("log_type") === "Time-out"}
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? plate_numbers?.find(
                                (vehicle) => vehicle === field.value
                              )
                            : "Select vehicle"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="Search vehicle..." />
                        <CommandList>
                          <CommandEmpty>No vehicle found.</CommandEmpty>
                          <CommandGroup>
                            {plate_numbers?.map((vehicle) => (
                              <CommandItem
                                value={vehicle}
                                key={vehicle}
                                onSelect={() => {
                                  form.setValue("plate_number", vehicle);
                                }}
                              >
                                {vehicle}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="log_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Log Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={"Time-in"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="Time-in"
                        onClick={() => setIsTimeOut(false)}
                      >
                        Time-in
                      </SelectItem>
                      <SelectItem
                        value="Time-out"
                        onClick={() => setIsTimeOut(true)}
                      >
                        Time-out
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
    </div>
  );
}
