import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How do we ensure the safety of commuters?",
    answer:
      "ligtascab enhances commuter safety by allowing passengers to scan a unique QR code on each tricycle, which provides important information such as the tricycle’s registration details and driver profile.",
  },
  {
    question: "How does the QR code system work?",
    answer:
      "Each tricycle has a unique QR code. Commuters can scan the code to view tricycle details, track their ride in real-time, and report any issues through the app. On the operator side, every scanned ride is logged in the system, providing operators with a detailed record of each tricycle’s activity and performance.",
  },
  {
    question: "What tools do we offer to operators?",
    answer:
      "LigtasCab provides operators with a comprehensive dashboard that tracks important metrics like the number of rides completed, tricycles in service, active drivers, and maintenance schedules.",
  },
  {
    question: "How do we handle emergency situations?",
    answer:
      "In the event of an emergency, commuters can use the emergency alert feature to notify authorities immediately. For operators, this ensures that any incidents involving their tricycles are quickly reported, helping them respond more effectively and ensure the safety of both the driver and the commuter.",
  },
];

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col gap-2 w-full px-8 md:max-w-(--breakpoint-xl) lg:grid-cols-2 lg:grid lg:gap-12"
    >
      {faqItems.map((item, index) => {
        return (
          <AccordionItem
            value={`${index.toString()}-item`}
            key={index}
            className="border-b border-b-gray-200 md:py-4"
          >
            <AccordionTrigger className="md:text-xl">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-balance md:text-lg md:text-pretty">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
