import React, { ReactNode } from "react";

interface FeatureCardProps {
  children: ReactNode;
  heading: string;
  subheading: string;
}

export default function FeatureCard({
  children,
  heading,
  subheading,
}: FeatureCardProps) {
  return (
    <div className="border border-primary rounded-md shadow-sm p-6 flex items-center flex-col gap-2 w-56 justify-center md:w-80 md:h-52 md:py-6 md:px-8 hover:shadow-lg text-primary-foreground md:items-start">
      <div className="flex items-center justify-between gap-2 md:justify-start md:gap-4">
        {children}
        <p className="font-bold text-sm md:text-xl text-primary">{heading}</p>
      </div>
      <p className="text-xs md:text-lg text-pretty text-muted md:text-left">
        {subheading}
      </p>
    </div>
  );
}
