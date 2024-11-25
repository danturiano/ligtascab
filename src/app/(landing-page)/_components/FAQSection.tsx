import React from "react";
import SectionHeader from "./SectionHeader";
import { AccordionDemo } from "./Accordion";

export default function FAQSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-6 mt-16 md:mt-40 md:gap-14">
      <SectionHeader
        title="FAQs"
        subtitle="Any Questions? Look Here"
        description="Quick answers to questions you may have."
      />
      <AccordionDemo />
    </section>
  );
}
