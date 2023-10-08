import { cn } from "@/shared/lib";
import { HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = ({
  as = "h3",
  className,
  children,
  ...props
}: HeadingProps) => {
  const Tag = as;

  return (
    <Tag
      className={cn(
        "font-medium",
        {
          "text-2xl md:text-4xl lg:text-5xl": as === "h1",
          "text-xl md:text-3xl lg:text-[40px]": as === "h2",
          "text-base md:text-2xl lg:text-[32px]": as === "h3",
          "text-sm md:text-lg lg:text-2xl": as === "h4",
          "text-xs md:text-base lg:text-xl": as === "h5",
          "text-xs md:text-sm lg:text-base": as === "h6",
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
