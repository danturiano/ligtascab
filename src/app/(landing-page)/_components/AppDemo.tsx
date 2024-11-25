import Image from "next/image";
import React from "react";
import dashboard from "/public/dashboard.svg";

export default function AppDemo() {
  return (
    <section className="relative flex justify-center top-[-4rem] md:top-[-8rem]">
      <Image src={dashboard} alt="dashboard sample" />
    </section>
  );
}
