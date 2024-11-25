import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="min-w-max border-t  py-4 mt-16 flex gap-4 items-center flex-col">
      <div className="flex text-xs items-center gap-4 md:text-md">
        <BrandLogo />
        <Link href="/">Home</Link>
        <Link href="/">Features</Link>
        <Link href="/">About</Link>
      </div>
      <div>
        <p className="text-xs text-[#868686]">
          Copyright © 2024 - All right reserved by Ligtascab
        </p>
      </div>
    </footer>
  );
}
