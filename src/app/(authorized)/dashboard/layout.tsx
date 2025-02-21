"use client";

import AppHeader from "@/features/dashboard/components/header";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AppHeader />
        <div className="mx-auto pb-10 mt-10 w-full max-w-screen-xl px-2.5 lg:px-20 flex flex-col gap-y-3">
          {children}
        </div>
        <Toaster
          position="bottom-center"
          containerStyle={{
            top: 20,
            left: 20,
            bottom: 80,
            right: 20,
          }}
        />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
