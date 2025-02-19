"use client";

import BrandLogo from "@/components/brand-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/supabase/client";
import { BookOpen, Car, FileClock, SquareTerminal } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "dashboard",
      url: "/dashboard",
      pathname: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Driver Shift Logs",
      url: "/dashboard/driver-logs",
      pathname: "/driver-logs",
      icon: FileClock,
    },
    {
      title: "Triycles",
      url: "/dashboard/vehicles",
      pathname: "/vehicles",
      icon: Car,
      isActive: true,
      items: [
        {
          title: "Tricycles",
          url: "/dashboard/vehicles",
        },
        {
          title: "Documents",
          url: "#",
        },
        {
          title: "Maintenance",
          url: "#",
        },
      ],
    },
    {
      title: "Drivers",
      url: "/dashboard/drivers",
      pathname: "/drivers",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "Drivers",
          url: "/dashboard/drivers",
        },
      ],
    },
  ],
};

const AppHeader = () => {
  const pathname = usePathname();
  const path = pathname.substring(pathname.lastIndexOf("/"));
  return (
    <div className="sticky -top-16 z-20 border-b border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a className="hidden transition-all sm:block" href="/app">
              <div className="flex max-w-fit items-center gap-2">
                <BrandLogo />
              </div>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a
              className="transition-all duration-75 active:scale-95"
              href="/upgrade"
            >
              <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-sm text-transparent">
                Upgrade
              </span>
            </a>
            <a
              href="#"
              className="hidden text-sm text-slate-500 transition-colors hover:text-slate-700 sm:block"
              target="_blank"
            >
              Help
            </a>
            <button
              onClick={() => {
                const supabase = createClient();
                supabase.auth.signOut();
                redirect("/sign-in");
              }}
              className="hidden text-sm cursor-pointer text-slate-500 transition-colors hover:text-slate-700 sm:block"
            >
              Sign Out
            </button>
            <Link href="/settings" className="relative inline-block pt-1.5">
              <button className="group relative sm:inline-flex" type="button">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                  // src={user.image ?? undefined}
                  // alt={user.first_name ?? undefined}
                  />
                  <AvatarFallback className="rounded-lg">
                    <div className="size-10"></div>
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500"></div>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="scrollbar-hide relative flex gap-x-2 overflow-x-auto transition-all w-full">
            {data.navMain.map((item) => {
              const title =
                item.title.charAt(0).toUpperCase() + item.title.slice(1);
              return (
                <Link key={item.title} href={item.url} className="relative">
                  <div
                    className={`mx-1 my-1.5 rounded-md px-3 py-1.5 transition-all duration-75 ${
                      path.startsWith(item.pathname)
                        ? "bg-transparent"
                        : "hover:bg-slate-100 active:bg-slate-200"
                    } group`}
                  >
                    <p
                      className={`text-sm ${
                        path.startsWith(item.pathname)
                          ? "text-black"
                          : "text-slate-600 hover:text-black group-hover:text-black"
                      }`}
                    >
                      {title}
                    </p>
                    {path.startsWith(item.pathname) && (
                      <div
                        className="absolute bottom-0 w-[80%]"
                        style={{
                          transform: "none",
                          transformOrigin: "50% 50% 0px",
                        }}
                      >
                        <div className="h-0.5 bg-black"></div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-2 flex items-center space-x-2">
            {/* <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium">Tokens</h3>
            </div> */}
            {/* <p className="text-sm text-slate-600">
              {userData?.tokens} / 20 tokens
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
