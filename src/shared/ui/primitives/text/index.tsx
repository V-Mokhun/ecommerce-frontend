import { cn } from "@/shared/lib";
import { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export const Text = ({
  as = "p",
  className,
  children,
  ...props
}: TextProps) => {
  const Tag = as;

  return (
    <Tag className={cn("", className)} {...props}>
      {children}
    </Tag>
  );
};
