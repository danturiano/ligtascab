"use client";

import SpinnerMini from "@/components/SpinnerMini";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInWithCredentials } from "../_lib/actions";
import { CredentialsSchema } from "../_lib/types";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CredentialsSchema>>({
    resolver: zodResolver(CredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof CredentialsSchema>) {
    startTransition(() => {
      verifyCredentials(data);
    });
  }

  const verifyCredentials = async (data: z.infer<typeof CredentialsSchema>) => {
    const response = await signInWithCredentials(data);
    console.log(response);
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="●●●●●●" {...field} />
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
