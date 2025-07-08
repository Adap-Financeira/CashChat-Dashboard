import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqAccordionProps {
  title: string;
  content: string;
}

export default function FaqAccordion({ title, content }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title} key={title} className="py-2">
        <AccordionTrigger className="py-2 text-lg leading-6 hover:no-underline">{title}</AccordionTrigger>
        <AccordionContent className="text-muted-foreground pb-2 text-base text-left">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
