"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-5 z-50"
        variant="ghost"
        size="icon"
      >
        {isOpen ? <X /> : <Menu />}
      </Button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 transition-opacity">
          <div className="flex fixed inset-y-0 right-0 w-52 bg-white shadow-lg pl-10">
            <div className="flex flex-col items-end justify-between w-full h-full mr-8">
              <div className="flex flex-col items-end gap-4 mt-32">
                <Link href="/">Features</Link>
                <Link href="/">About</Link>
                <Link href="/">FAQs</Link>
              </div>
              <div className="flex flex-col items-end gap-4 mb-16">
                <Button variant="outline">Login</Button>
                <Button>Be our partner</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
