import { ChevronRight } from "lucide-react";
import { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { Heading, Separator } from "..";

interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  viewAllLink?: string;
}

export const SectionHeading = ({
  className,
  viewAllLink,
  children,
  ...props
}: SectionHeadingProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Heading as="h3" className={className} {...props}>
          {children}
        </Heading>
        {viewAllLink && (
          <NavLink
            className="inline-flex items-center gap-1 text-sm md:text-base hover:underline"
            to={viewAllLink}
          >
            <span>View all</span>
            <ChevronRight className="w-6 h-6" />
          </NavLink>
        )}
      </div>
      <Separator className="my-2 md:my-4" />
    </>
  );
};
