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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerDriver } from "../actions/drivers";
import { DriverSchema } from "../schemas/drivers";
import toast from "react-hot-toast";

export default function DriverForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DriverSchema>>({
    resolver: zodResolver(DriverSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      license_number: "",
      phone_number: "",
    },
  });

  const queryClient = useQueryClient();

  const useCreateDriver = useMutation({
    mutationFn: registerDriver,
  });

  function onSubmit(data: z.infer<typeof DriverSchema>) {
    startTransition(() => {
      useCreateDriver.mutate(data, {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: ["drivers"],
          });
          queryClient.invalidateQueries({
            queryKey: ["notifications"],
          });
          if (response?.message) {
            toast.success(response.message);
            form.reset();
          }
        },
      });
    });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license_expiry"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
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
                <PopoverContent className="w-auto p-0" align="start">
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
