import { cn } from "@/shared/lib";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {}

export const Section = ({ className, children, ...props }: SectionProps) => {
  return (
    <section className={cn("py-3 md:py-4 lg:py-6", className)} {...props}>
      {children}
    </section>
  );
};
