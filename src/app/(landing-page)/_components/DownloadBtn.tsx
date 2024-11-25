import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import android from "/public/android-brand.svg";
import apple from "/public/apple-brand.svg";

export default function DownloadBtn() {
  return (
    <div className="flex mt-4 md:mt-8 space-x-4">
      <Button size="sm" className="py-7 px-4 gap-4 md:px-8 md:py-10">
        <Image src={apple} alt="apple logo" className="md:h-10 md:w-10" />
        <div className="flex flex-col items-start">
          <p className="text-xs md:text-lg">Download on</p>
          <p className="text-md font-bold md:text-xl">Apple Store</p>
        </div>
      </Button>
      <Button size="sm" className="py-7 px-4 gap-4 md:px-8 md:py-10">
        <Image src={android} alt="apple logo" className="md:h-10 md:w-10" />
        <div className="flex flex-col items-start">
          <p className="text-xs md:text-lg">Download on</p>
          <p className="text-md font-bold md:text-xl">Play Store</p>
        </div>
      </Button>
    </div>
  );
}
