"use client";

import SpinnerMini from "@/components/spinner-mini";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProfileSchema } from "../schemas/setup";
import { updateUserInformation } from "../actions/setup";

export default function UserDocumentsForm({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      subscribe: false,
    },
  });

  function onSubmit(data: z.infer<typeof ProfileSchema>) {
    startTransition(() => {
      registerCredentials(data);
    });
  }

  const registerCredentials = async (data: z.infer<typeof ProfileSchema>) => {
    const response = await updateUserInformation(data);
    if (response) {
      onComplete();
    }
    if (response?.error) {
      return null;
    }
  };

  return (
    <div className="p-16 flex flex-col gap-8">
      <div>
        <p>3/3</p>
        <p className="font-semibold text-2xl">Documents</p>
      </div>
      <div className="space-y-6">
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-6 space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your first name..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="enter your last name..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="ligtascab@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subscribe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Subscribe to product update emails</FormLabel>
                      <FormDescription>
                        Get the latest updates about features updates.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
    </div>
  );
}
