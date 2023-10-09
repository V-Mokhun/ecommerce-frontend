import { cn } from "@/shared/lib";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  as?: "section" | "div";
}

export const Section = ({
  className,
  children,
  as: Component = "section",
  ...props
}: SectionProps) => {
  return (
    <Component className={cn("py-3 md:py-4 lg:py-6", className)} {...props}>
      {children}
    </Component>
  );
};
