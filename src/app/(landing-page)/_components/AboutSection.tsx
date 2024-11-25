import React from "react";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import phone from "/public/about-img.svg";

export default function AboutSection() {
  return (
    <section className="flex items-center justify-center text-center flex-col gap-4 lg:grid lg:grid-cols-2 lg:text-start">
      <div className="space-y-4">
        <SectionHeader
          title="About"
          subtitle="Making tricycle commuting safe and easy"
          description="We created this platform with a simple vision to provide safer, more convenient tricycle rides for commuters while empowering drivers and operators with powerful digital tools."
        />
        <Button>Be our partner</Button>
      </div>
      <Image
        src={phone}
        alt="picture of a phone with ligtascab app"
        className="lg:mt-16"
      />
    </section>
  );
}
